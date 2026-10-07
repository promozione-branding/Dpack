function asText(value) {
  if (value && typeof value === "object") {
    const label = value.label || value.name || "";
    const detail = value.value ?? value.description ?? "";
    return label ? `${label}: ${detail}` : String(detail);
  }
  return String(value ?? "").trim();
}

function cleanContent(value) {
  return asText(value)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#039;/gi, "'")
    .replace(/^[\s•◆🔹♦-]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalized(value) {
  return cleanContent(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function addIfMissing(items, value) {
  const cleaned = cleanContent(value);
  const key = normalized(cleaned);
  if (
    key &&
    !items.some((item) => normalized(item) === key)
  ) {
    items.push(cleaned);
  }
}

function addExtractedFeature(items, value) {
  const key = normalized(value);
  const alreadyIncluded = items.some((item) => {
    const existing = normalized(item);
    return existing === key || (
      Math.min(existing.length, key.length) >= 12 &&
      (existing.includes(key) || key.includes(existing))
    );
  });

  if (!alreadyIncluded) addIfMissing(items, value);
}

function getDescriptionSections(description) {
  const sections = [];
  const fieldForHeading = (value) => {
    const title = cleanContent(value).replace(/:$/, "").toLowerCase();
    if (/^key features?$/.test(title)) return "keyFeatures";
    if (/^(?:(?:product|technical) )?specifications?$/.test(title)) return "specs";
    if (
      /^(?:(?:product )?applications?|(?:product )?uses?|ideal for|ideal applications?|suitable for)$/.test(
        title
      )
    ) {
      return "applications";
    }
    if (/^(available )?sizes?$|^variants?$/.test(title)) return "sizes";
    return null;
  };

  if (!/<[a-z][\s\S]*>/i.test(description)) {
    const headings = [];
    let offset = 0;

    for (const line of description.split(/\r?\n/)) {
      const lineEnd = offset + line.length;
      const lineEnding = description.slice(lineEnd).startsWith("\r\n")
        ? 2
        : description[lineEnd] === "\n" || description[lineEnd] === "\r"
          ? 1
          : 0;
      const field = fieldForHeading(line);
      if (field) {
        headings.push({
          field,
          start: offset,
          contentStart: lineEnd + lineEnding,
        });
      }
      offset = lineEnd + lineEnding;
    }

    for (let index = 0; index < headings.length; index++) {
      const heading = headings[index];
      const end = headings[index + 1]?.start ?? description.length;
      sections.push({
        ...heading,
        end,
        content: description.slice(heading.contentStart, end),
      });
    }

    return sections;
  }

  const headingPattern = /<(h[1-6]|p|div)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings = [];
  let match;

  while ((match = headingPattern.exec(description))) {
    const field = fieldForHeading(match[2]);

    if (field) {
      headings.push({
        field,
        start: match.index,
        contentStart: headingPattern.lastIndex,
      });
    }
  }

  for (let index = 0; index < headings.length; index++) {
    const heading = headings[index];
    const end = headings[index + 1]?.start ?? description.length;
    sections.push({
      ...heading,
      end,
      content: description.slice(heading.contentStart, end),
    });
  }

  return sections;
}

function extractSectionItems(section) {
  const items = [];
  if (!/<[a-z][\s\S]*>/i.test(section.content)) {
    return section.content
      .split(/\r?\n/)
      .map(cleanContent)
      .filter(Boolean);
  }

  const listPattern = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let match;

  while ((match = listPattern.exec(section.content))) {
    addIfMissing(items, cleanContent(match[1]));
  }

  if (items.length) return items;

  const rowPattern = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  while ((match = rowPattern.exec(section.content))) {
    const cells = [...match[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/gi)]
      .map((cell) => cleanContent(cell[1]))
      .filter(Boolean);
    if (cells.length > 1) addIfMissing(items, `${cells[0]}: ${cells.slice(1).join(" ")}`);
  }

  if (items.length) return items;

  const paragraphPattern = /<p\b[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = paragraphPattern.exec(section.content))) {
    addIfMissing(items, cleanContent(match[1]));
  }

  return items;
}

function splitKnownSpecificationLabels(value) {
  const text = cleanContent(value);
  const labelPattern =
    /(?:Brand|Box Type|Ply|Capacity|Material|Color|Thickness|Width|Length|Height|Weight|GSM|Product Type|Structure|Protection|Inflation|Installation|Packaging|SKU|Use|Application|Applications|Usage|Suitable For|Size|Sizes|Available Sizes|Variant|Variants)\s*:/gi;
  const labels = [...text.matchAll(labelPattern)];

  if (labels.length < 2) return [text];

  const pieces = [];
  if (labels[0].index > 0) {
    addIfMissing(pieces, text.slice(0, labels[0].index));
  }

  labels.forEach((label, index) => {
    const end = labels[index + 1]?.index ?? text.length;
    addIfMissing(pieces, text.slice(label.index, end));
  });

  return pieces;
}

function stripRepeatedDescriptionParagraphs(description, repeatedItems) {
  if (!description) return "";
  const repeated = new Set(repeatedItems.map(normalized).filter(Boolean));
  let cleaned = description;

  for (const item of repeatedItems) {
    const text = cleanContent(item);
    if (normalized(text).length < 30) continue;
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    cleaned = cleaned.replace(new RegExp(escaped, "gi"), "");
  }

  return cleaned
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (paragraph, contents) =>
      repeated.has(normalized(contents)) ? "" : paragraph
    )
    .replace(/<(span|strong|em|b|i)\b[^>]*>\s*<\/\1>/gi, "")
    .replace(/(?:<p\b[^>]*>\s*(?:<br\s*\/?>|\s|&nbsp;)*<\/p>){2,}/gi, "");
}

export function organizeProductFields(product = {}) {
  const keyFeatures = [];
  for (const feature of Array.isArray(product.keyFeatures)
    ? product.keyFeatures
    : []) {
    addIfMissing(keyFeatures, feature);
  }

  const applications = [];
  const sizes = [];
  const specs = [];

  for (const application of Array.isArray(product.applications)
    ? product.applications
    : []) {
    addIfMissing(
      applications,
      asText(application).replace(
        /^(applications?|usage|uses?|used for|use case|suitable for):\s*/i,
        ""
      )
    );
  }

  for (const size of Array.isArray(product.sizes) ? product.sizes : []) {
    addIfMissing(
      sizes,
      asText(size).replace(/^(sizes?|available sizes?|variants?):\s*/i, "")
    );
  }

  const addSpecification = (specification) => {
    const text = asText(specification).replace(/^[\s•◆🔹♦-]+/, "");
    const sizeMatch = text.match(/^(?:available )?sizes?\s*[-:]\s*(.+)$/i);
    if (sizeMatch) {
      addIfMissing(sizes, sizeMatch[1]);
      return;
    }

    for (const piece of splitKnownSpecificationLabels(text)) {
      const separator = piece.indexOf(":");
      if (separator < 1) {
        addIfMissing(specs, piece);
        continue;
      }

      const label = piece.slice(0, separator).trim();
      const value = piece.slice(separator + 1).trim();
      if (/^(applications?|usage|uses?|used for|use case|suitable for)$/i.test(label)) {
        addIfMissing(applications, value);
      } else if (/^(sizes?|available sizes?|variants?)$/i.test(label)) {
        addIfMissing(sizes, value);
      } else {
        addIfMissing(specs, piece);
      }
    }
  };

  for (const specification of Array.isArray(product.specs) ? product.specs : []) {
    addSpecification(specification);
  }

  let description = String(product.description || "");
  for (const section of getDescriptionSections(description).reverse()) {
    const items = extractSectionItems(section);
    for (const item of items) {
      if (section.field === "keyFeatures") {
        addExtractedFeature(keyFeatures, item);
      } else if (section.field === "specs") {
        addSpecification(item);
      } else {
        addIfMissing(
          section.field === "applications"
            ? applications
            : section.field === "sizes"
              ? sizes
              : specs,
          item
        );
      }
    }
    description =
      description.slice(0, section.start) + description.slice(section.end);
  }

  const overview = [];
  const descriptionKey = normalized(cleanContent(product.description));
  for (const entry of Array.isArray(product.overview) ? product.overview : []) {
    const text = cleanContent(entry);
    const sizeMatch = text.match(/^(?:available )?sizes?\s*[-:]\s*(.+)$/i);
    if (sizeMatch) {
      addIfMissing(sizes, sizeMatch[1]);
      continue;
    }

    const applicationMatch = text.match(/^(?:applications?|usage|uses?|used for|use case|suitable for)\s*:\s*(.+)$/i);
    if (applicationMatch) {
      addIfMissing(applications, applicationMatch[1]);
      continue;
    }

    const textKey = normalized(text);
    const repeated = [
      ...keyFeatures,
      ...applications,
      ...sizes,
      ...specs,
    ].some((item) => {
      const itemKey = normalized(item);
      return itemKey && textKey && itemKey === textKey;
    }) || (
      textKey.length >= 24 &&
      descriptionKey.length >= textKey.length &&
      descriptionKey.includes(textKey)
    );
    if (!repeated) addIfMissing(overview, text);
  }

  const descriptionWithoutRepeats = stripRepeatedDescriptionParagraphs(
    description,
    [...applications, ...sizes]
  );

  return {
    applications,
    description: descriptionWithoutRepeats,
    keyFeatures,
    overview,
    specs,
    sizes,
  };
}
