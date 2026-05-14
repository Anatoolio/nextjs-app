import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const protectedRoutes = [
    "/ingredients",
    "/profile",
    "/recipes/:path*",
    "/recipes/new",
  ];

  if (
    protectedRoutes.some((route) =>
      pathname.startsWith(route.replace(":path*", "")),
    )
  ) {
    if (!token) {
      const url = new URL("/error", request.url);
      url.searchParams.set("message", "Unauthorized access. Please log in.");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ingredients", "/profile", "/recipes/:path*", "/recipes/new"],
};
