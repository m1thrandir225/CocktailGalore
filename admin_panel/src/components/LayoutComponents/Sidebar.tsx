import { useState } from "react";
import NavLink from "./MenuItem";
import MenuItem from "./MenuItem";
import { AiOutlineLogout } from "react-icons/ai";
import { BiDrink, BiMenu } from "react-icons/bi";
import { BsSignpost } from "react-icons/bs";
import { FaRegLemon } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GiOrangeSlice } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { logoutApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";

interface ISidebarProps {
  collapsed: boolean;
  loading: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<ISidebarProps> = ({
  collapsed,
  loading,
  setCollapsed,
}) => {
  const auth = useAuthUser();
  const user = auth()?.user;
  const signOut = useSignOut();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logoutApi(auth()?.user.id);
    if (response.status == 200) {
      signOut();
      navigate("/login");
    }
  };
  return (
    <div
      className={`flex flex-col justify-start  h-full  bg-gray-100 text-gray-700 transition-[width] ease-in-out duration-500 drop-shadow-lg 
    dark:bg-gray-700 dark:text-gray-200 ${collapsed ? "w-20" : "w-64"}`}
    >
      <div
        className={`flex flex-col justify-center items-center gap-4 bg-gray-200 dark:bg-gray-800 ${
          collapsed ? "py-2" : "py-4"
        }`}
      >
        <img
          src={`https://galore-mobile-bucket.s3.eu-central-1.amazonaws.com/userProfileImages/${user.profileImage}`}
          alt="user_photo"
          width={collapsed ? 224 : 320}
          height={collapsed ? 224 : 320}
          className={`${
            collapsed ? "w-14 h-14" : "w-20 h-20"
          } rounded-full object-cover transition-all ease-in-out duration-500 border-2 border-gray-800 dark:border-gray-200`}
        />
        <h1
          className={`font-sans text-2xl font-bold ${
            collapsed ? "hidden" : ""
          }`}
        >
          Hello, {user.firstName}
        </h1>
      </div>
      <div className="flex flex-col items-start justify-between h-full">
        <div className="w-full">
          <div
            className={`flex flex-col items-stretch justify-start  ${
              !collapsed ? "p-4  gap-4" : ""
            }`}
          >
            <MenuItem
              title="Dashboard"
              to="/"
              icon={<MdDashboard />}
              isCollapsed={collapsed}
            />
            <MenuItem
              title="Cocktails"
              to="/cocktails"
              icon={<BiDrink />}
              isCollapsed={collapsed}
            />
            <MenuItem
              title="Categories"
              to="/categories"
              icon={<GiOrangeSlice />}
              isCollapsed={collapsed}
            />
            <MenuItem
              title="Insights"
              to="/insights"
              icon={<BsSignpost />}
              isCollapsed={collapsed}
            />
            <MenuItem
              title="Flavours"
              to="/flavours"
              icon={<FaRegLemon />}
              isCollapsed={collapsed}
            />
            <MenuItem
              title="Users"
              to="/users"
              icon={<FiUsers />}
              isCollapsed={collapsed}
            />
            <MenuItem
              title="Settings"
              to="/settings"
              icon={<IoSettingsOutline />}
              isCollapsed={collapsed}
            />
          </div>
          <div className={!collapsed ? "p-2" : ""}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`flex w-full flex-row  items-center h-12 px-4  cursor-pointer  gap-4  hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
                collapsed
                  ? "justify-center rounded-none"
                  : "justify-start rounded-lg"
              }`}
            >
              <BiMenu size={24} />
              <span
                className={`text-lg font-medium ${collapsed ? "hidden" : ""}`}
              >
                Collapse
              </span>
            </button>
          </div>
        </div>
        <div className={`w-full ${!collapsed ? "p-2" : ""}`}>
          <button
            className={`flex w-full flex-row  items-center h-12 px-4  cursor-pointer  gap-4  hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
              collapsed
                ? "justify-center rounded-none"
                : "justify-start rounded-lg"
            }`}
            onClick={handleLogout}
          >
            <AiOutlineLogout size={24} />
            <span
              className={`text-lg font-medium ${collapsed ? "hidden" : ""}`}
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
