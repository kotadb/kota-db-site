import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if coming soon mode is enabled
  const comingSoonMode =
    process.env["NEXT_PUBLIC_COMING_SOON_MODE"] === "true" ||
    process.env["NEXT_PUBLIC_COMING_SOON_MODE"] === "1";

  // If coming soon mode is disabled, allow all traffic
  if (!comingSoonMode) {
    return NextResponse.next();
  }

  // Allow access to coming-soon page itself
  if (pathname === "/coming-soon") {
    return NextResponse.next();
  }

  // Allow API routes (needed for waitlist signup)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Allow static files
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect all other traffic to coming-soon
  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.redirect(url);
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
