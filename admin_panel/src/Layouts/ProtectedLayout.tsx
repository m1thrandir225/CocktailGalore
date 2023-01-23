import React, { useContext, useEffect } from "react";
import { AuthContext, AuthProvider, useAuth } from "../context/AuthContex";
import { Navigate, useNavigate, useOutlet } from "react-router-dom";
import Sidebar from "../components/LayoutComponents/Sidebar";
import { useState } from "react";
import Topbar from "../components/LayoutComponents/Topbar";

const ProtectedLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const outlet = useOutlet();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  //if not logged in redirected to login page
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthProvider>
      <div className="w-screen h-screen flex flex-row justify-start items-start">
        <Sidebar
          collapsed={collapsed}
          loading={false}
          user={user}
          setCollapsed={setCollapsed}
        />
        <main className="bg-white dark:bg-gray-900 h-screen w-screen flex flex-col justify-start items-start px-8">
          <Topbar />
          {outlet}
        </main>
      </div>
    </AuthProvider>
  );
};

export default ProtectedLayout;
