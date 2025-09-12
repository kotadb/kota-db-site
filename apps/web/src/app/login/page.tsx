"use client";

import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  useEffect(() => {
    // Redirect to the app's login page using Next.js navigation
    const isLocal =
      typeof window !== "undefined" && window.location.hostname === "localhost";
    const dashboardBase = isLocal
      ? "http://localhost:3001"
      : process.env["NEXT_PUBLIC_DASHBOARD_URL"] || "https://app.kotadb.io";
    const redirectUrl = `${dashboardBase}/login`;

    // For external redirects, we still need window.location.href
    // But wrapped in proper client-side checks
    if (typeof window !== "undefined") {
      window.location.href = redirectUrl;
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Redirecting to login...
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we redirect you.
        </p>
      </div>
    </div>
  );
}
