export const colorPalette = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
  },
  red: {
    500: "#ef4444",
    600: "#dc2626",
  },
} as const;

export const gradients = {
  primary: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
  dark: "linear-gradient(180deg, #0f172a 0%, #020617 100%)",
  heroDark: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #134e4a 100%)",
  heroLight: "linear-gradient(135deg, #f0fdfa 0%, #ecfeff 50%, #ecfdf5 100%)",
} as const;

export const spacing = {
  section: {
    y: {
      compact: "py-16",
      default: "py-24",
      spacious: "py-32",
    },
  },
  containerPadding: "px-4 sm:px-6 lg:px-8",
} as const;

export const typography = {
  fontFamily: {
    sans: "var(--font-roboto)",
    mono: "var(--font-roboto-mono)",
  },
  heading: {
    hero: "text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold",
    section: "text-3xl sm:text-4xl font-bold",
    subheading: "text-2xl font-semibold",
  },
  body: {
    base: "text-base sm:text-lg leading-relaxed",
    sm: "text-sm leading-relaxed",
  },
} as const;

export const layout = {
  maxWidth: "max-w-7xl",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  card: {
    base: "rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-lg",
  },
} as const;

export const designTokens = {
  colorPalette,
  gradients,
  spacing,
  typography,
  layout,
} as const;

export type DesignTokens = typeof designTokens;
