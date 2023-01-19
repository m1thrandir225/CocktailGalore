import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title> Galore - Cocktails & More </title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
