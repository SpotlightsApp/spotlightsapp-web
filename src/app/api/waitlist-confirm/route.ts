import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || !email) {
    return Response.json(
      { error: "name and email are required" },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);

  const html = `<!doctype html>
<html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; line-height: 1.6; padding: 24px;">
    <p>Hi ${safeName}, thanks for signing up. Stay tuned, you'll be among the first to know when we launch.</p>
    <p>Thanks,<br />The Spotlights Team.</p>
  </body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: "Spotlights <noreply@spotlightsapp.com>",
    to: email,
    subject: "Waitlist confirmation",
    html,
  });

  if (error) {
    console.error("resend send failed:", error);
    return Response.json({ error: "Failed to send email" }, { status: 502 });
  }

  return Response.json({ id: data?.id });
}
