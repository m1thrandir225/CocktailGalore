import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
interface NavItemProps {
  Icon: React.ReactNode;
  to: string;
  title: string;
  isCollapsed: boolean;
}
const NavItem = ({ Icon, to, title, isCollapsed }: NavItemProps) => {
  const router = useRouter();
  return (
    <Link
      href={to}
      className={`flex flex-row items-center h-12 px-4  cursor-pointer hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
        isCollapsed ? "justify-center rounded-none" : "rounded-lg justify-start"
      }${router.pathname === to ? "bg-green-300 dark:bg-green-600" : ""}`}
    >
      {Icon}
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

export default NavItem;
