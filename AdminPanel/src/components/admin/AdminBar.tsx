import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiDrink, BiMenu } from "react-icons/bi";
import { BsSignpost } from "react-icons/bs";
import { FaRegLemon } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GlobalContext } from "../../context/GlobalContext";
import NavItem from "../Sidebar/NavItem";

const Sidebar = () => {
  const { sideBarCollapsed, setSideBarCollapsed } = useContext(GlobalContext);
  const { data, status } = useSession();
  if (status === "loading" || data == undefined) return null;
  return (
    <div
      className={`flex flex-col justify-start  h-screen  bg-gray-100 text-gray-700 transition-[width] ease-in-out duration-500 drop-shadow-lg 
    dark:bg-gray-700 dark:text-gray-200 ${sideBarCollapsed ? "w-20" : "w-64"}`}
    >
      <div
        className={`flex flex-col justify-center items-center gap-4 bg-gray-200 dark:bg-gray-800 ${
          sideBarCollapsed ? "py-2" : "py-4"
        }`}
      >
        <Image
          src={`https://galore-mobile-bucket.s3.eu-central-1.amazonaws.com/userProfileImages/${data.user.profileImage}`}
          alt="user_photo"
          width={sideBarCollapsed ? 224 : 320}
          height={sideBarCollapsed ? 224 : 320}
          className={`${
            sideBarCollapsed ? "w-14 h-14" : "w-20 h-20"
          } rounded-full object-cover transition-all ease-in-out duration-500 border-2 border-gray-800 dark:border-gray-200`}
        />
        <h1
          className={`font-sans text-2xl font-bold ${
            sideBarCollapsed ? "hidden" : ""
          }`}
        >
          Hello, {data.user.firstName}
        </h1>
      </div>
      <div className="flex flex-col items-start justify-between h-screen">
        <div className="w-full">
          <div className={!sideBarCollapsed ? "p-4" : ""}>
            <NavItem
              title="Dashboard"
              to="/admin"
              Icon={<MdDashboard />}
              isCollapsed={sideBarCollapsed}
            />
            <NavItem
              title="Cocktails"
              to="/admin/cocktails"
              Icon={<BiDrink />}
              isCollapsed={sideBarCollapsed}
            />
            <NavItem
              title="Insights"
              to="/admin/insights"
              Icon={<BsSignpost />}
              isCollapsed={sideBarCollapsed}
            />
            <NavItem
              title="Flavours"
              to="/admin/flavours"
              Icon={<FaRegLemon />}
              isCollapsed={sideBarCollapsed}
            />
            <NavItem
              title="Users"
              to="/admin/users"
              Icon={<FiUsers />}
              isCollapsed={sideBarCollapsed}
            />
            <NavItem
              title="Settings"
              to="/admin/settings"
              Icon={<IoSettingsOutline />}
              isCollapsed={sideBarCollapsed}
            />
          </div>
          <div className={!sideBarCollapsed ? "p-2" : ""}>
            <button
              onClick={() => setSideBarCollapsed(!sideBarCollapsed)}
              className={`flex w-full flex-row  items-center h-12 px-4  cursor-pointer  gap-4  hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
                sideBarCollapsed
                  ? "justify-center rounded-none"
                  : "justify-start rounded-lg"
              }`}
            >
              <BiMenu size={24} />
              <span
                className={`text-lg font-medium ${
                  sideBarCollapsed ? "hidden" : ""
                }`}
              >
                Collapse
              </span>
            </button>
          </div>
        </div>
        <div className={`w-full ${!sideBarCollapsed ? "p-2" : ""}`}>
          <button
            className={`flex w-full flex-row  items-center h-12 px-4  cursor-pointer  gap-4  hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600 ${
              sideBarCollapsed
                ? "justify-center rounded-none"
                : "justify-start rounded-lg"
            }`}
            onClick={() => signOut()}
          >
            <AiOutlineLogout size={24} />
            <span
              className={`text-lg font-medium ${
                sideBarCollapsed ? "hidden" : ""
              }`}
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
