import React from "react";
import { Link, useLocation, useNavigation } from "react-router-dom";

interface IMenuItem {
  icon: React.ReactNode;
  to: string;
  title: string;
  isCollapsed: boolean;
}

const MenuItem: React.FC<IMenuItem> = ({ icon, title, to, isCollapsed }) => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Link
      to={to}
      className={`flex flex-row items-center h-12 px-4  cursor-pointer hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
        isCollapsed ? "justify-center rounded-none" : "rounded-lg justify-start"
      } ${pathname === to ? "bg-amber-400 dark:bg-amber-600" : ""}`}
    >
      {icon}
      <h1
        className={`ml-4 text-sm font-medium transition-transform ease-out-out duration-500 text-gray-700 dark:text-gray-200 ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {title}
      </h1>
    </Link>
  );
};

export default MenuItem;
