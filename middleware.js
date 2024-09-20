/* import { NextResponse } from "next/server";
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
} */
export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/inventory/products",
    "/inventory/categories",
    "/inventory/critical-stock",
    "/inventory/bar-code",
    "/business/orders",
    "/business/orderslist",
    "/admin/customers",
    "/admin/users",
    "/admin/system",
  ],
};
