import React from "react";
import { NotificationProvider } from "@/context/NotificationContext";
import { ActionsProvider } from "@/context/actionsProvider";
import { NextUIProvider } from "@nextui-org/react";
import Provider from "@/context/Provider";
import "@/styles/globals.css";

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <Provider>
          <ActionsProvider>
            <Component {...pageProps} />
          </ActionsProvider>
        </Provider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
