import crypto from "crypto";

export default function generateApiKey() {
  return "cs_" + crypto.randomBytes(32).toString("hex");
}
