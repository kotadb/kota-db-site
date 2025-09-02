"use client";

import { useEffect } from "react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  useEffect(() => {
    // Redirect to the app's login page
    const isLocal = window.location.hostname === "localhost";
    const redirectUrl = isLocal
      ? "http://localhost:3001/login"
      : "https://app.kotadb.io/login";

    window.location.href = redirectUrl;
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
