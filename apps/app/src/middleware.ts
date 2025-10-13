import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if coming soon mode is enabled
  const comingSoonMode =
    process.env["NEXT_PUBLIC_COMING_SOON_MODE"] === "true" ||
    process.env["NEXT_PUBLIC_COMING_SOON_MODE"] === "1";

  // If coming soon mode is enabled, redirect to marketing site
  if (comingSoonMode) {
    return NextResponse.redirect(
      new URL("https://kotadb.io/coming-soon", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
