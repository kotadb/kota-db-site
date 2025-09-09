import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

// Initialize Resend with API key (only if configured)
const resendApiKey = process.env["RESEND_API_KEY"];
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Validation schema for waitlist submission
const WaitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.string().optional().default("landing_page"),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedData = WaitlistSchema.parse(body);

    // Get client IP address
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      null;

    // Get user agent
    const userAgent = request.headers.get("user-agent") || null;

    // Insert into Supabase waitlist table
    const { error } = await supabase.from("waitlist").insert({
      email: validatedData.email,
      source: validatedData.source,
      referrer: validatedData.referrer,
      utm_source: validatedData.utmSource,
      utm_medium: validatedData.utmMedium,
      utm_campaign: validatedData.utmCampaign,
      utm_term: validatedData.utmTerm,
      utm_content: validatedData.utmContent,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      // Check if email already exists
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the waitlist!" },
          { status: 409 },
        );
      }
      throw error;
    }

    // Send confirmation email if Resend is configured
    if (resend && process.env["RESEND_FROM_EMAIL"]) {
      try {
        await resend.emails.send({
          from: process.env["RESEND_FROM_EMAIL"],
          to: validatedData.email,
          subject: "Welcome to the KotaDB Waitlist!",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">You're on the list! 🎉</h1>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Thank you for joining the KotaDB waitlist. We're excited to have you as one of our early supporters!
              </p>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                We're working hard to bring you a powerful, developer-friendly database solution. As a waitlist member, you'll get:
              </p>
              
              <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.8;">
                <li>Early access when we launch</li>
                <li>Exclusive updates on our progress</li>
                <li>Special launch pricing</li>
              </ul>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to check out our <a href="https://github.com/kotadb" style="color: #0066cc;">GitHub</a> or <a href="https://docs.kotadb.io" style="color: #0066cc;">documentation</a>.
              </p>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #888; font-size: 14px;">
                If you didn't sign up for this list, you can safely ignore this email.
              </p>
            </div>
          `,
        });

        // Send notification to admin
        if (resend && process.env["RESEND_ADMIN_EMAIL"]) {
          await resend.emails.send({
            from: process.env["RESEND_FROM_EMAIL"],
            to: process.env["RESEND_ADMIN_EMAIL"],
            subject: "New KotaDB Waitlist Signup",
            html: `
              <p>New waitlist signup:</p>
              <ul>
                <li>Email: ${validatedData.email}</li>
                <li>Source: ${validatedData.source}</li>
                <li>Time: ${new Date().toISOString()}</li>
              </ul>
            `,
          });
        }
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error("Failed to send email:", emailError);
      }
    }

    return NextResponse.json(
      { message: "Successfully added to waitlist!" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Invalid input" },
        { status: 400 },
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
