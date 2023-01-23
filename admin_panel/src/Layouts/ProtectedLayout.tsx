import React from "react";
import { useAuth } from "../context/AuthContex";
import { Navigate, useOutlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  const [collapsed, setCollapsed] = useState(false);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-screen h-screen flex flex-row justify-start items-start">
      <Sidebar collapsed={collapsed} loading={false} user={user} />
      <main>{outlet}</main>
    </div>
  );
};

export default ProtectedLayout;
