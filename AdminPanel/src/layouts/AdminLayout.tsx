import Head from "next/head";
import React from "react";
import Sidebar from "../components/admin/AdminBar";
import Topbar from "../components/admin/Topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title> Galore - Admin </title>
      </Head>
      <main className="flex flex-row items-start justify-between">
        <Sidebar />
        <div className="flex flex-col items-start justify-start w-full h-screen px-4 transition-colors duration-100 ease-in bg-gray-200 dark:bg-gray-800">
          <Topbar />
          {children}
        </div>
      </main>
    </>
  );
};

export default AdminLayout;
