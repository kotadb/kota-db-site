import type { Metadata } from "next";

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://www.kotadb.io";
const DEFAULT_TITLE = "KotaDB — Hosted intelligence for coding agents";
const TITLE_TEMPLATE = "%s | KotaDB";
const DEFAULT_DESCRIPTION =
  "KotaDB gives Claude, Codex, and every coding agent a hosted knowledge graph, replacing manual context wrangling with answers you can trust.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface CreatePageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
}: CreatePageMetadataOptions = {}): Metadata {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const canonicalUrl = new URL(path ?? "", SITE_URL).toString();
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: title
      ? { default: resolvedTitle, template: TITLE_TEMPLATE }
      : DEFAULT_TITLE,
    description: resolvedDescription,
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: "KotaDB",
      images: [ogImage],
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
  };
}

export { SITE_URL };
