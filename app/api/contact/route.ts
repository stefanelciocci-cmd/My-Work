import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "stefanelciocci@gmail.com",
      subject: `New Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f9a875; border-bottom: 2px solid #f9a875; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #1a1520; padding: 20px; border-radius: 10px; color: #e8d4b8;">
            <p><strong style="color: #7dd3a8;">Name:</strong> ${name}</p>
            <p><strong style="color: #7dd3a8;">Email:</strong> <a href="mailto:${email}" style="color: #f9a875;">${email}</a></p>
            <p><strong style="color: #7dd3a8;">Message:</strong></p>
            <p style="white-space: pre-wrap; background: #2a2030; padding: 15px; border-radius: 8px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
