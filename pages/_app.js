import React from "react";
import { NotificationProvider } from "@/context/NotificationContext";
import { NextUIProvider } from "@nextui-org/react";
import Provider from "@/context/Provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
