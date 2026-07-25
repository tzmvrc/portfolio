export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormValues, string>>;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactForm(
  values: Partial<ContactFormValues>,
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormValues, string>> = {};
  const name = normalize(values.name);
  const email = normalize(values.email);
  const message = normalize(values.message);

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function parseContactForm(body: unknown): ContactFormValues {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      name: "",
      email: "",
      company: "",
      message: "",
    };
  }

  const candidate = body as Record<string, unknown>;

  return {
    name: normalize(candidate.name),
    email: normalize(candidate.email),
    company: normalize(candidate.company),
    message: normalize(candidate.message),
  };
}

export async function handleContactSubmission(
  body: unknown,
  env: Record<string, string | undefined> | undefined = undefined,
) {
  const { Resend } = await import("resend");
  const { config } = await import("dotenv");
  config();
  const values = parseContactForm(body);
  const validation = validateContactForm(values);

  if (!validation.valid) {
    return {
      status: 400,
      body: {
        success: false,
        message: "Please fix the highlighted fields and try again.",
        errors: validation.errors,
      },
    };
  }

  const runtimeEnv =
    env ??
    (typeof globalThis !== "undefined"
      ? ((
          globalThis as {
            process?: { env?: Record<string, string | undefined> };
          }
        ).process?.env ?? {})
      : {});
  const apiKey = runtimeEnv.RESEND_API_KEY;
  const fromEmail = runtimeEnv.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toEmail = runtimeEnv.RESEND_TO_EMAIL || "mjaspa9@gmail.com";

  if (!apiKey) {
    return {
      status: 500,
      body: {
        success: false,
        message: "The email service is not configured yet.",
      },
    };
  }

  try {
    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Portfolio Contact from ${values.name}`,
      text: [
        `Name: ${values.name}`,
        "",
        `Email: ${values.email}`,
        "",
        `Company: ${values.company || "N/A"}`,
        "",
        "Message:",
        values.message,
      ].join("\n"),
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${values.name}</p>
        <p><strong>Email:</strong> ${values.email}</p>
        <p><strong>Company:</strong> ${values.company || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${values.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (response.error) {
      return {
        status: 502,
        body: {
          success: false,
          message:
            "The message could not be sent right now. Please try again shortly.",
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "Thanks for reaching out! I'll get back to you soon.",
      },
    };
  } catch (error) {
    console.error("Contact form email error", error);
    return {
      status: 500,
      body: {
        success: false,
        message:
          "A network or server error occurred while sending your message.",
      },
    };
  }
}
