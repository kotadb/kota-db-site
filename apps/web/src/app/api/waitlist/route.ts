import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseClient } from "@/lib/supabase";

const WaitlistSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = WaitlistSchema.parse(body);

    // Get request metadata
    const userAgent = request.headers.get("user-agent") || undefined;
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ipAddress = forwardedFor?.split(",")[0] || realIp || undefined;
    const referrer = request.headers.get("referer") || undefined;

    // Get UTM parameters from URL
    const url = new URL(request.url);
    const utmSource = url.searchParams.get("utm_source") || undefined;
    const utmMedium = url.searchParams.get("utm_medium") || undefined;
    const utmCampaign = url.searchParams.get("utm_campaign") || undefined;
    const utmTerm = url.searchParams.get("utm_term") || undefined;
    const utmContent = url.searchParams.get("utm_content") || undefined;

    // Insert into Supabase
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("waitlist").insert({
      email,
      source: "coming_soon_page",
      user_agent: userAgent,
      ip_address: ipAddress,
      referrer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
    });

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist." },
          { status: 400 },
        );
      }

      // Check if it's an email format validation error
      if (error.code === "23514") {
        return NextResponse.json(
          { error: "Invalid email format." },
          { status: 400 },
        );
      }

      throw error;
    }

    return NextResponse.json(
      {
        message: "Successfully joined the waitlist! We'll be in touch soon.",
        data,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues;
      return NextResponse.json(
        { error: issues[0]?.message || "Invalid email format." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
