import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { NotificationProvider } from "@/context/NotificationContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { ProductProvider } from "@/context/ProductContext";
import { CategoryProvider } from "@/context/CategoryContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <SessionProvider session={session}>
          <ProductProvider>
            <CategoryProvider>
              <CustomerProvider>
                <Component {...pageProps} />
              </CustomerProvider>
            </CategoryProvider>
          </ProductProvider>
        </SessionProvider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
