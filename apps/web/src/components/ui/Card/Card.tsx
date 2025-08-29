import { type HTMLAttributes, type FC, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant = "default", padding = "md", children, ...props },
    ref,
  ) => {
    const variantClasses = {
      default: "bg-white",
      bordered: "bg-white border border-gray-200",
      elevated: "bg-white shadow-lg",
    };

    const paddingClasses = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
          variantClasses[variant],
          paddingClasses[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
};

CardHeader.displayName = "CardHeader";

export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn("text-2xl font-semibold text-gray-900", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

CardTitle.displayName = "CardTitle";

export const CardDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p className={cn("text-gray-600 mt-2", className)} {...props}>
      {children}
    </p>
  );
};

CardDescription.displayName = "CardDescription";

export const CardContent: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
};

CardContent.displayName = "CardContent";

export const CardFooter: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("mt-6 flex items-center justify-end gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
};

CardFooter.displayName = "CardFooter";
