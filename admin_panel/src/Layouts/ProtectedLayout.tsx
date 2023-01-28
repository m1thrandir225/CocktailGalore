import React from "react";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { SWRConfig } from "swr/_internal";
import Sidebar from "../components/LayoutComponents/Sidebar";
import Topbar from "../components/LayoutComponents/Topbar";
import { useOutlet } from "react-router-dom";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="w-screen h-screen flex flex-row justify-start items-start">
      <Sidebar
        collapsed={collapsed}
        loading={false}
        setCollapsed={setCollapsed}
      />
      <main className="bg-white dark:bg-gray-900 h-full w-screen flex flex-col justify-start items-start px-8">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
