"use client";

import { useState } from "react";
import { z } from "zod";

const EmailSchema = z.string().email();

interface EmailCaptureProps {
  source?: string;
  className?: string;
  onSuccess?: () => void;
}

export function EmailCapture({
  source = "landing_page",
  className = "",
  onSuccess,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const validation = EmailSchema.safeParse(email);
    if (!validation.success) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // Get UTM parameters from URL
      const params = new URLSearchParams(window.location.search);
      const utmData = {
        utmSource: params.get("utm_source") || undefined,
        utmMedium: params.get("utm_medium") || undefined,
        utmCampaign: params.get("utm_campaign") || undefined,
        utmTerm: params.get("utm_term") || undefined,
        utmContent: params.get("utm_content") || undefined,
      };

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source,
          referrer: document.referrer || undefined,
          ...utmData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list! Check your email for confirmation.");
      setEmail("");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      console.error("Waitlist submission error:", error);
    }
  };

  if (status === "success") {
    return (
      <div
        className={`rounded-lg bg-[var(--success-bg)] p-6 text-center ${className}`}
      >
        <svg
          className="mx-auto h-12 w-12 text-[var(--success-text)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
          You&apos;re on the list!
        </h3>
        <p className="mt-2 text-sm text-[var(--foreground-secondary)]">
          Check your email for confirmation. We&apos;ll notify you when we
          launch.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-[var(--foreground)] placeholder-[var(--foreground-secondary)] focus:border-[var(--input-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)]"
              disabled={status === "loading"}
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-[var(--button-primary-bg)] px-6 py-3 font-semibold text-[var(--button-primary-text)] transition-colors hover:bg-[var(--button-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--button-primary-bg)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <span className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Joining...
                </span>
              ) : (
                "Get Early Access"
              )}
            </button>
          </div>
        </div>

        {status === "error" && message && (
          <p className="text-sm text-[var(--error-text)]">{message}</p>
        )}

        <p className="text-xs text-[var(--foreground-secondary)]">
          Join 500+ developers giving Claude Code the intelligence it deserves.
          No spam, unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
