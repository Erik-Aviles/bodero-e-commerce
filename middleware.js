export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/categories/:path*", "/products/:path*"],
};
