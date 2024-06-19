import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { NotificationProvider } from "@/context/NotificationContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { ProductProvider } from "@/context/ProductContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { UserProvider } from "@/context/UserContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <SessionProvider session={session}>
          <UserProvider>
            <ProductProvider>
              <CategoryProvider>
                <CustomerProvider>
                  <Component {...pageProps} />
                </CustomerProvider>
              </CategoryProvider>
            </ProductProvider>
          </UserProvider>
        </SessionProvider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
