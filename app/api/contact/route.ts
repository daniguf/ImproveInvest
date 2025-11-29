import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend instance
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "subject",
      "message",
    ];
    for (const field of requiredFields) {
      if (!body[field as keyof ContactFormData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "contact.improveinvest.dk",
      to: "info@improveinvest.com",
      subject: `Contact Form: ${body.subject}`,
      replyTo: body.email,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Form Submission</h2>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #374151; margin-bottom: 15px;">Contact Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; width: 30%;">Name:</td>
                    <td style="padding: 8px 0;">${body.firstName} ${body.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;">${body.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0;">${body.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600;">Subject:</td>
                    <td style="padding: 8px 0;">${body.subject}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
                <h3 style="color: #374151; margin-bottom: 15px;">Message</h3>
                <p style="margin: 0; white-space: pre-wrap;">${body.message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.875rem; color: #6b7280;">
                <p>This email was sent from the contact form on your website.</p>
                <p>Sent at: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Contact Information:
Name: ${body.firstName} ${body.lastName}
Email: ${body.email}
Phone: ${body.phone}
Subject: ${body.subject}

Message:
${body.message}

This email was sent from the contact form on your website.
Sent at: ${new Date().toLocaleString()}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully", id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
