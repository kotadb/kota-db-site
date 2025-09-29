import type { ReactNode } from "react";
import { typography } from "@kotadb/shared";
import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const alignmentMap = {
  left: "text-left",
  center: "text-center mx-auto",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", alignmentMap[align], className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 text-sm font-semibold">
          {eyebrow}
        </span>
      )}
      <h3
        className={cn(
          typography.heading.section,
          "text-[var(--foreground)]",
          titleClassName,
        )}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          className={cn(
            "text-lg text-[var(--foreground-secondary)] max-w-3xl",
            align === "center" && "mx-auto",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
