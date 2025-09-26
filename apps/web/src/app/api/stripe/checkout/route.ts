import { NextRequest, NextResponse } from "next/server";

import { getAppUrl, getDashboardUrl } from "@kotadb/shared";

import { stripe } from "@/lib/stripe";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 },
    );
  }

  try {
    const { priceId, email, plan } = await request.json();

    if (!priceId || !email || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const dashboardUrl = getDashboardUrl();
    const marketingUrl = getAppUrl();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${dashboardUrl}/onboarding?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${marketingUrl}/pricing`,
      customer_email: email,
      metadata: {
        plan,
        email,
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
