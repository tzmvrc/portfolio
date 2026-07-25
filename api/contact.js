import { handleContactSubmission } from "../src/lib/contact.js";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  try {
    const result = await handleContactSubmission(req.body);
    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Contact route error", error);
    return res.status(400).json({ success: false, message: "Invalid request body." });
  }
}