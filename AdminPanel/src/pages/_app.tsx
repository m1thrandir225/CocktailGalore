import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import GlobalProvider from "../context/GlobalContext";
import "../styles/globals.css";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </SessionProvider>
  );
}
