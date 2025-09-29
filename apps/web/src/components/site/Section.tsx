import type { ReactNode } from "react";
import { layout, spacing } from "@kotadb/shared";
import { cn } from "@/lib/utils/cn";

const sectionSpacing: Record<"compact" | "default" | "spacious", string> = {
  compact: spacing.section.y.compact,
  default: spacing.section.y.default,
  spacious: spacing.section.y.spacious,
};

interface SectionProps {
  children: ReactNode;
  variant?: "compact" | "default" | "spacious";
  className?: string;
  containerClassName?: string;
  disableContainer?: boolean;
  id?: string;
}

export function Section({
  children,
  variant = "default",
  className,
  containerClassName,
  disableContainer,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("w-full", sectionSpacing[variant], className)}
    >
      {disableContainer ? (
        children
      ) : (
        <div className={cn(layout.container, containerClassName)}>
          {children}
        </div>
      )}
    </section>
  );
}
