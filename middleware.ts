import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/api/")) {
    const res = NextResponse.next();

    res.headers.set("Cache-Control", "public, s-maxage=600, stale-while-revalidate=300");

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
