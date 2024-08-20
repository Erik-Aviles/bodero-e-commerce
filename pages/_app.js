import React from "react";
import { NotificationProvider } from "@/context/NotificationContext";
import { ActionsProvider } from "@/context/actionsProvider";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <SessionProvider session={session}>
          <ActionsProvider>
            <Component {...pageProps} />
          </ActionsProvider>
        </SessionProvider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
