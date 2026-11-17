const TRACKING_API = "https://brandbnalo.com/api/tracking/create";

// Set your default supplier ID here
const DEFAULT_SUPPLIER_TOKEN = process.env.NEXT_PUBLIC_SUPPLIER_TOKEN || "6a266629a0e54917311a8ce5";

export const trackEvent = ({ eventType, obj = null, source = "Website", supplierToken, }) => {
   const webisteUrl = window.location.hostname + window.location.pathname;
    const payload = {
        productId: obj?.name || "N/A",
        supplierToken: supplierToken || obj?.supplierToken || DEFAULT_SUPPLIER_TOKEN,
        eventType,
       source: webisteUrl || source,
    };

    if (!payload.supplierToken) {
        console.warn("Tracking: supplierToken missing");
        return;
    }

    // Fire and forget - no blocking navigation
    fetch(TRACKING_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
    }).catch((error) => {
        console.error("Tracking Error:", error);
    });
};

// Call tracking
export const handleCallClick = ({ obj = null, source = "Website", supplierToken, }) => {
    trackEvent({
        eventType: "call_click",
        obj,
        source,
        supplierToken,
    });
};

// WhatsApp tracking
export const handleWhatsappClick = ({ obj = null, source = "Website", supplierToken, }) => {
    trackEvent({
        eventType: "whatsapp_click",
        obj,
        source,
        supplierToken,
    });
};
