import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { NotificationProvider } from "@/context/NotificationContext";
import { ProductsProvider } from "@/context/ProoductsContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { ServicesProvider } from "@/context/Services.Context";
import { OrdersProvider } from "@/context/OrdersContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <SessionProvider session={session}>
          <ProductsProvider>
            <CategoriesProvider>
              {/* <ServicesProvider> */}
              <OrdersProvider>
                <Component {...pageProps} />
              </OrdersProvider>
              {/* </ServicesProvider> */}
            </CategoriesProvider>
          </ProductsProvider>
        </SessionProvider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
