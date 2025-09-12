"use client";

import type { Repository } from "@kotadb/shared";
import { useState, useEffect } from "react";

import { getSupabase } from "@/lib/supabase";
import {
  validateRepositories,
  validateRepository,
  formatError,
} from "@/lib/type-guards";

interface RepositoryListProps {
  userId: string;
}

export default function RepositoryList({ userId }: RepositoryListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");

  useEffect(() => {
    if (userId) {
      void fetchRepositories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchRepositories = async () => {
    try {
      const { data, error } = await getSupabase()
        .from("repositories")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw new Error(formatError(error));
      setRepositories(validateRepositories(data));
    } catch (error) {
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  const addRepository = async () => {
    if (!githubUrl || !githubUrl.includes("github.com")) {
      alert("Please enter a valid GitHub URL");
      return;
    }

    setAdding(true);

    try {
      // Extract repo name from URL
      const urlParts = githubUrl.split("/").filter(Boolean);
      const repoName = urlParts.slice(-2).join("/");

      const result = await getSupabase()
        .from("repositories")
        .insert({
          user_id: userId,
          github_url: githubUrl,
          name: repoName,
          status: "pending",
        })
        .select()
        .single();

      const { data, error } = result as {
        data: unknown;
        error: { code?: string } | null;
      };

      if (error) {
        if (error.code === "23505") {
          alert("This repository has already been added");
        } else {
          throw new Error(formatError(error));
        }
      } else if (data) {
        const validatedData = validateRepository(data);
        setRepositories([validatedData, ...repositories]);
        setGithubUrl("");

        // TODO: Trigger indexing job
      }
    } catch (error) {
      console.error("Error adding repository:", error);
      alert("Failed to add repository. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const deleteRepository = async (id: string) => {
    if (!confirm("Are you sure you want to delete this repository?")) {
      return;
    }

    try {
      const { error } = await getSupabase()
        .from("repositories")
        .delete()
        .eq("id", id);

      if (error) throw new Error(formatError(error));

      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      console.error("Error deleting repository:", error);
      alert("Failed to delete repository. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "indexing":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30";
      case "failed":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading repositories...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Repositories
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/owner/repo"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            onClick={() => void addRepository()}
            disabled={adding}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adding ? "Adding..." : "Add Repository"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {repositories.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No repositories added yet. Add your first GitHub repository to get
            started.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {repositories.map((repo) => (
              <li
                key={repo.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {repo.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {repo.github_url}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(repo.status)}`}
                      >
                        {repo.status}
                      </span>
                      {repo.error_message && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          Error: {repo.error_message}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => void deleteRepository(repo.id)}
                    className="ml-4 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
