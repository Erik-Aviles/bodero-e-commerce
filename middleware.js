export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/inventory/:path*",
    "/business/:path*",
    "/admin/:path*",
  ],
};


/* import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Verifica roles o permisos
  if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/inventory/:path*",
    "/business/:path*",
    "/admin/:path*",
  ],
}; */