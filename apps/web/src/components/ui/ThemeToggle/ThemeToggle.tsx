"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Light mode"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2m11-11h-2M4 12H2m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636" />
          </svg>
        );
      case "dark":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Dark mode"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        );
      case "system":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="System mode"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system mode";
      case "system":
        return "Switch to light mode";
      default:
        return "Toggle theme";
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200",
        "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]",
        "hover:bg-[var(--button-secondary-bg)]",
        "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
        "focus:ring-offset-[var(--background)]",
        className,
      )}
      aria-label={getLabel()}
      aria-live="polite"
      title={getLabel()}
    >
      {getIcon()}
      <span className="sr-only">{`Current theme: ${theme}`}</span>
    </button>
  );
}
