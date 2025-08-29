"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import RepositoryList from "@/components/RepositoryList";
import ApiKeyManager from "@/components/ApiKeyManager";
import UsageMetrics from "@/components/UsageMetrics";

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "repositories" | "api-keys" | "usage"
  >("repositories");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = process.env["NEXT_PUBLIC_APP_URL"] + "/login";
        return;
      }

      setUser(session.user);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          window.location.href = process.env["NEXT_PUBLIC_APP_URL"] + "/login";
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href =
      process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000";
  };

  const openBilling = () => {
    // This would typically open Stripe Customer Portal
    window.open("https://billing.stripe.com/p/login/test", "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                KotaDB Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email}
              </span>
              <button
                onClick={openBilling}
                className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
              >
                Billing
              </button>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("repositories")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "repositories"
                  ? "border-teal-500 text-teal-600 dark:text-teal-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Repositories
            </button>
            <button
              onClick={() => setActiveTab("api-keys")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "api-keys"
                  ? "border-teal-500 text-teal-600 dark:text-teal-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              API Keys
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "usage"
                  ? "border-teal-500 text-teal-600 dark:text-teal-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Usage
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "repositories" && user?.id && (
          <RepositoryList userId={user.id} />
        )}
        {activeTab === "api-keys" && user?.id && (
          <ApiKeyManager userId={user.id} />
        )}
        {activeTab === "usage" && user?.id && <UsageMetrics userId={user.id} />}
      </main>
    </div>
  );
}
