import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { NotificationProvider } from "@/context/NotificationContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </NotificationProvider>
    </NextUIProvider>
  );
}
