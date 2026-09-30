import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "stefanelciocci@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Everything the visitor typed is escaped before it goes into the email HTML.
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const name = String(body?.name ?? "").trim().slice(0, 100);
    const email = String(body?.email ?? "").trim().slice(0, 200);
    const message = String(body?.message ?? "").trim().slice(0, 5000);

    // Honeypot filled in: pretend success so bots don't retry.
    if (body?.company) return NextResponse.json({ success: true });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      console.error("Contact form: RESEND_API_KEY is not set");
      return NextResponse.json({ error: "The contact form isn't configured yet. Please email me directly." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO,
      subject: `New contact from ${name.replace(/[\r\n]+/g, " ")}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #c6f432; border-bottom: 2px solid #c6f432; padding-bottom: 10px;">New contact form submission</h2>
          <div style="background: #141414; padding: 20px; border-radius: 10px; color: #fafafa;">
            <p><strong style="color: #c6f432;">Name:</strong> ${safeName}</p>
            <p><strong style="color: #c6f432;">Email:</strong> <a href="mailto:${safeEmail}" style="color: #c6f432;">${safeEmail}</a></p>
            <p><strong style="color: #c6f432;">Message:</strong></p>
            <p style="white-space: pre-wrap; background: #1f1f1f; padding: 15px; border-radius: 8px;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">Sent from your portfolio contact form.</p>
        </div>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
