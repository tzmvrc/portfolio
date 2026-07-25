import { handleContactSubmission } from "../lib/contact";

export async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method not allowed." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const body = await request.json();
    const result = await handleContactSubmission(body);

    return new Response(JSON.stringify(result.body), {
      status: result.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact route error", error);
    return new Response(
      JSON.stringify({ success: false, message: "Invalid request body." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
