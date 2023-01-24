import React from "react";
import { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import Sidebar from "../components/LayoutComponents/Sidebar";
import Topbar from "../components/LayoutComponents/Topbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const auth = useAuthUser();
  return (
    <div className="w-screen h-screen flex flex-row justify-start items-start">
      <Sidebar
        collapsed={collapsed}
        loading={false}
        user={auth()?.user}
        setCollapsed={setCollapsed}
      />
      <main className="bg-white dark:bg-gray-900 h-screen w-screen flex flex-col justify-start items-start px-8">
        <Topbar />
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
