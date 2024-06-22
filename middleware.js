import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req) {
  const token = req.cookies.get("myTokenName");

  if (token === undefined) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  try {
    const tokenValue = token?.value;
    jwtVerify(tokenValue, new TextEncoder().encode(process.env.SECRET));
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/products/:path*",
    "/categories/:path*",
    "/orderlist/:path*",
    "/orders/:path*",
    "/customers/:path*",
    "/users/:path*",
  ],
};
