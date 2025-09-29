"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

      // Handle OAuth errors
      if (hasError) {
        console.error("OAuth error:", searchParams.get("error"));
        window.location.href = "https://kotadb.io/login";
        return;
      }

      if (hasAuthParams) {
        // This is likely an OAuth callback, wait longer for Supabase to process
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session retrieval error:", error);
      }

      if (!mounted) return;

      if (session) {
        router.push("/dashboard");
      } else if (!hasAuthParams) {
        // Only redirect to login if this wasn't an OAuth callback attempt
        window.location.href = "https://kotadb.io/login";
      } else {
        // If it was an OAuth callback but no session, wait a bit more then try again
        setTimeout(() => {
          if (mounted) {
            window.location.reload();
          }
        }, 2000);
      }
    };

    // Listen for auth state changes (handles OAuth callback)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (event === "SIGNED_IN" && session) {
          router.push("/dashboard");
        } else if (event === "SIGNED_OUT") {
          window.location.href = "https://kotadb.io/login";
        }
      },
    );

    void checkAuth();

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
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
