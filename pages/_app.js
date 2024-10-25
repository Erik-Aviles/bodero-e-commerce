import React from "react";
import { NotificationProvider } from "@/context/NotificationContext";
import { ActionsProvider } from "@/context/actionsProvider";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        {/* Metaetiqueta viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <NextUIProvider>
        <NotificationProvider>
          <SessionProvider session={session}>
            <ActionsProvider>
              <Component {...pageProps} />
            </ActionsProvider>
          </SessionProvider>
        </NotificationProvider>
      </NextUIProvider>
    </>
  );
}
