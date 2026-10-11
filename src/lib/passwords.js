import crypto from "crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);
const KEY_LENGTH = 64;

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password, passwordHash) {
  if (typeof passwordHash !== "string") return false;
  const [salt, storedKeyHex] = passwordHash.split(":");
  if (!salt || !/^[a-f0-9]{128}$/i.test(storedKeyHex || "")) return false;

  const storedKey = Buffer.from(storedKeyHex, "hex");
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return crypto.timingSafeEqual(storedKey, derivedKey);
}
