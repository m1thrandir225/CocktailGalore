import React from "react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BiDrink, BiMenu } from "react-icons/bi";
import { BsSignpost } from "react-icons/bs";
import { FaRegLemon } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import Image from "next/image";
import NavItem from "../Sidebar/NavItem";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <div
      className={`flex flex-col justify-start  h-screen  bg-gray-100 text-gray-700 transition-[width] ease-in-out duration-500 drop-shadow-lg 
    dark:bg-gray-700 dark:text-gray-200 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <div
        className={`flex flex-col justify-center items-center gap-4 bg-gray-200 dark:bg-gray-800 ${
          isCollapsed ? "py-2" : "py-4"
        }`}
      >
        <Image
          src="https://images.unsplash.com/photo-1673581209559-fd5f75a08664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt="user_photo"
          width={isCollapsed ? 224 : 320}
          height={isCollapsed ? 224 : 320}
          className={`${
            isCollapsed ? "w-14 h-14" : "w-20 h-20"
          } rounded-full object-cover transition-all ease-in-out duration-500 border-2 border-gray-800 dark:border-gray-200`}
        />
        <h1
          className={`font-sans text-2xl font-bold ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          Hello, Sebastijan
        </h1>
      </div>
      <div className="flex flex-col items-start justify-between h-screen">
        <div className="w-full">
          <div className={!isCollapsed ? "p-4" : ""}>
            <NavItem
              title="Dashboard"
              to="/"
              Icon={<MdDashboard />}
              isCollapsed={isCollapsed}
            />
            <NavItem
              title="Cocktails"
              to="/cocktails"
              Icon={<BiDrink />}
              isCollapsed={isCollapsed}
            />
            <NavItem
              title="Insights"
              to="/insights"
              Icon={<BsSignpost />}
              isCollapsed={isCollapsed}
            />
            <NavItem
              title="Flavours"
              to="/flavours"
              Icon={<FaRegLemon />}
              isCollapsed={isCollapsed}
            />
            <NavItem
              title="Users"
              to="/users"
              Icon={<FiUsers />}
              isCollapsed={isCollapsed}
            />
            <NavItem
              title="Settings"
              to="/settings"
              Icon={<IoSettingsOutline />}
              isCollapsed={isCollapsed}
            />
          </div>
          <div className={!isCollapsed ? "p-2" : ""}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`flex w-full flex-row  items-center h-12 px-4  cursor-pointer  gap-4  hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
                isCollapsed
                  ? "justify-center rounded-none"
                  : "justify-start rounded-lg"
              }`}
            >
              <BiMenu size={24} />
              <span
                className={`text-lg font-medium ${isCollapsed ? "hidden" : ""}`}
              >
                Collapse
              </span>
            </button>
          </div>
        </div>
        <div className={`w-full ${!isCollapsed ? "p-2" : ""}`}>
          <button
            onClick={() => handleLogout()}
            className={`flex w-full flex-row  items-center h-12 px-4  cursor-pointer  gap-4  hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
              isCollapsed
                ? "justify-center rounded-none"
                : "justify-start rounded-lg"
            }`}
          >
            <AiOutlineLogout size={24} />
            <span
              className={`text-lg font-medium ${isCollapsed ? "hidden" : ""}`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
