"use client";

import { generateApiKey, type ApiKey } from "@kotadb/shared";
import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

interface ApiKeyManagerProps {
  userId: string;
}

type SupabaseListResponse<T> = {
  data: T[] | null;
  error: PostgrestError | null;
};

type SupabaseSingleResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};

export default function ApiKeyManager({ userId }: ApiKeyManagerProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [showNewKey, setShowNewKey] = useState(false);

  useEffect(() => {
    if (userId) {
      void fetchApiKeys();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchApiKeys = async () => {
    try {
      const response: SupabaseListResponse<ApiKey> = await supabase
        .from("api_keys")
        .select("*")
        .eq("user_id", userId)
        .is("revoked_at", null)
        .order("created_at", { ascending: false });

      if (response.error) throw response.error;
      const apiKeyRows = response.data ?? [];
      setApiKeys(apiKeyRows);
    } catch (error: unknown) {
      console.error("Error fetching API keys:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    // Check if user already has 5 keys (limit for team plan)
    if (apiKeys.length >= 5) {
      alert("You have reached the maximum number of API keys for your plan.");
      return;
    }

    setGenerating(true);

    try {
      const { key, hash, prefix } = generateApiKey();

      const response: SupabaseSingleResponse<ApiKey> = await supabase
        .from("api_keys")
        .insert({
          user_id: userId,
          key_hash: hash,
          key_prefix: prefix,
          name: `API Key ${apiKeys.length + 1}`,
        })
        .select()
        .single();

      if (response.error) throw response.error;

      if (response.data) {
        const newApiKey = response.data;
        setApiKeys((prev) => [newApiKey, ...prev]);
        setNewKey(key);
        setShowNewKey(true);
      }
    } catch (error: unknown) {
      console.error("Error generating API key:", error);
      alert("Failed to generate API key. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const revokeKey = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to revoke this API key? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const { error }: SupabaseSingleResponse<ApiKey> = await supabase
        .from("api_keys")
        .update({ revoked_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      setApiKeys((prev) => prev.filter((key) => key.id !== id));
    } catch (error: unknown) {
      console.error("Error revoking API key:", error);
      alert("Failed to revoke API key. Please try again.");
    }
  };

  const copyToClipboard = (text: string) => {
    void navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("API key copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy API key. Please try again.");
      });
  };

  if (loading) {
    return <div className="text-center py-8">Loading API keys...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          API Keys
        </h2>

        <button
          onClick={() => {
            void generateNewKey();
          }}
          disabled={generating}
          className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? "Generating..." : "Generate New API Key"}
        </button>
      </div>

      {/* New Key Modal */}
      {showNewKey && newKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              API Key Generated
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 rounded p-3 mb-4">
              <code className="text-sm text-gray-900 dark:text-gray-100 break-all">
                {newKey}
              </code>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mb-4">
              ⚠️ This is the only time you&apos;ll see this key. Please copy and
              store it securely.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  void copyToClipboard(newKey);
                }}
                className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => {
                  setShowNewKey(false);
                  setNewKey(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {apiKeys.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No API keys yet. Generate your first API key to start using KotaDB.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {apiKeys.map((key) => (
              <li
                key={key.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {key.name || "Unnamed Key"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {key.key_prefix}...
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      Created: {new Date(key.created_at).toLocaleDateString()}
                      {key.last_used_at && (
                        <>
                          {" "}
                          • Last used:{" "}
                          {new Date(key.last_used_at).toLocaleDateString()}
                        </>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      void revokeKey(key.id);
                    }}
                    className="ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Revoke
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Security Note:</strong> API keys provide full access to your
          KotaDB account. Keep them secure and never share them publicly or
          commit them to version control.
        </p>
      </div>
    </div>
  );
}
