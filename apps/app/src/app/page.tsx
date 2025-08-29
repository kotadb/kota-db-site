"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      // First, check if this is an OAuth callback by looking for auth tokens in URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const searchParams = new URLSearchParams(window.location.search);
      const hasCode = searchParams.has("code");
      const hasError = searchParams.has("error");

      const hasAuthParams =
        hashParams.has("access_token") ||
        hasCode ||
        hashParams.has("token_type");

      console.log("Auth check:", {
        hasAuthParams,
        hasCode,
        hasError,
        hash: window.location.hash,
        search: window.location.search,
      });

      // Handle OAuth errors
      if (hasError) {
        console.error("OAuth error:", searchParams.get("error"));
        window.location.href = "https://kotadb.io/login";
        return;
      }

      if (hasAuthParams) {
        console.log(
          "OAuth callback detected, waiting for Supabase to process...",
        );
        // This is likely an OAuth callback, wait longer for Supabase to process
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log("Session check result:", { session: !!session, error });

      if (!mounted) return;

      if (session) {
        console.log("Session found, redirecting to dashboard");
        router.push("/dashboard");
      } else if (!hasAuthParams) {
        console.log("No session and no auth params, redirecting to login");
        // Only redirect to login if this wasn't an OAuth callback attempt
        window.location.href = "https://kotadb.io/login";
      } else {
        console.log("OAuth callback but no session, retrying...");
        // If it was an OAuth callback but no session, wait a bit more then try again
        setTimeout(() => {
          if (mounted) {
            console.log("Reloading page to retry auth check");
            window.location.reload();
          }
        }, 2000);
      }
    };

    // Listen for auth state changes (handles OAuth callback)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log("Auth state change:", { event, session: !!session });

        if (event === "SIGNED_IN" && session) {
          console.log(
            "User signed in via auth state change, redirecting to dashboard",
          );
          router.push("/dashboard");
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out, redirecting to login");
          window.location.href = "https://kotadb.io/login";
        }
      },
    );

    checkAuth();

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Redirecting...
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we check your authentication.
        </p>
      </div>
    </div>
  );
}
