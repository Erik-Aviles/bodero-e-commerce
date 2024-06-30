import "@/styles/globals.css";
import { NotificationProvider } from "@/context/NotificationContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { ProductProvider } from "@/context/ProductContext";
import { UserProvider } from "@/context/UserContext";
import { NextUIProvider } from "@nextui-org/react";
import Provider from "@/context/Provider";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <Provider>
          <UserProvider>
            <ProductProvider>
              <CategoryProvider>
                <CustomerProvider>
                  <Component {...pageProps} />
                </CustomerProvider>
              </CategoryProvider>
            </ProductProvider>
          </UserProvider>
        </Provider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
