import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 },
    );
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Get customer details
        const customer = await stripe.customers.retrieve(
          session.customer as string,
        );

        if ("deleted" in customer) {
          throw new Error("Customer was deleted");
        }

        // Update user with Stripe customer ID and subscription info
        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            stripe_customer_id: customer.id,
            subscription_status: "active",
            subscription_plan: session.metadata?.["plan"] || "solo",
            updated_at: new Date().toISOString(),
          })
          .eq("email", customer.email);

        if (updateError) {
          console.error("Failed to update user:", updateError);
          throw updateError;
        }

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        const { error } = await supabaseAdmin
          .from("users")
          .update({
            subscription_status: subscription.status as
              | "active"
              | "canceled"
              | "past_due"
              | "trialing"
              | "inactive",
            subscription_end_date:
              "current_period_end" in subscription
                ? new Date(
                    (subscription as { current_period_end: number })
                      .current_period_end * 1000,
                  ).toISOString()
                : new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", subscription.customer);

        if (error) {
          console.error("Failed to update subscription:", error);
          throw error;
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const { error } = await supabaseAdmin
          .from("users")
          .update({
            subscription_status: "canceled",
            subscription_end_date:
              "current_period_end" in subscription
                ? new Date(
                    (subscription as { current_period_end: number })
                      .current_period_end * 1000,
                  ).toISOString()
                : new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", subscription.customer);

        if (error) {
          console.error("Failed to cancel subscription:", error);
          throw error;
        }

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        const { error } = await supabaseAdmin
          .from("users")
          .update({
            subscription_status: "past_due",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_customer_id", invoice.customer);

        if (error) {
          console.error("Failed to update payment failed status:", error);
          throw error;
        }

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
