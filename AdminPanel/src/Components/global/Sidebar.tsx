import { AiOutlineMenu } from "solid-icons/ai";
import {
  BiRegularDrink,
  BiRegularLemon,
  BiSolidDashboard,
} from "solid-icons/bi";
import { BsSignpost } from "solid-icons/bs";
import { Component, createSignal } from "solid-js";
import NavItem from "../Sidebar/NavItem";
import { BiRegularGroup } from "solid-icons/bi";
import { IoSettingsOutline } from "solid-icons/io";
import { AiOutlineLogout } from "solid-icons/ai";

const Sidebar: Component = () => {
  const [collapsed, setCollapsed] = createSignal(false);
  const handleLogout = () => {
    localStorage.setItem("isAuth", "false");
    window.location.reload();
  };
  return (
    <div
      class="flex flex-col justify-start  h-screen w-64 bg-gray-100 text-gray-700 transition-[width] ease-in-out duration-500 drop-shadow-lg 
       dark:bg-gray-700 dark:text-gray-200
      "
      classList={{ "w-20": collapsed() }}
    >
      <div
        class="flex flex-col justify-center items-center gap-4 py-4 bg-gray-200 dark:bg-gray-800"
        classList={{ "py-2": collapsed() }}
      >
        <img
          src="https://images.unsplash.com/photo-1673943834356-9a7f1682dada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
          alt="profileImage"
          class="w-20 h-20 rounded-full object-cover transition-all ease-in-out duration-500 border-2 border-gray-800 dark:border-gray-200"
          classList={{ "w-14 h-14": collapsed() }}
        />
        <h1
          class="font-bold font-sans text-2xl"
          classList={{ hidden: collapsed() }}
        >
          Hello, Sebastijan
        </h1>
      </div>
      <div class="flex flex-col justify-between  items-start h-screen">
        <div class="w-full">
          <div classList={{ "p-4": !collapsed() }}>
            <NavItem
              Icon={BiSolidDashboard}
              to="/"
              title="Dashboard"
              isCollapsed={collapsed()}
            />
            <NavItem
              Icon={BiRegularDrink}
              to="/cocktails"
              title="Cocktails"
              isCollapsed={collapsed()}
            />
            <NavItem
              Icon={BsSignpost}
              to="/insights"
              title="Insights"
              isCollapsed={collapsed()}
            />
            <NavItem
              Icon={BiRegularLemon}
              to="/flavours"
              title="Flavours"
              isCollapsed={collapsed()}
            />
            <NavItem
              Icon={BiRegularGroup}
              to="/users"
              title="Users"
              isCollapsed={collapsed()}
            />
            <NavItem
              Icon={IoSettingsOutline}
              to="/settings"
              title="Settings"
              isCollapsed={collapsed()}
            />
          </div>
          <div classList={{ "p-2": !collapsed() }}>
            <button
              class="flex w-full flex-row justify-start items-center h-12 px-4 rounded-lg cursor-pointer  gap-4  hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600"
              onClick={() => setCollapsed(!collapsed())}
              classList={{ "justify-center rounded-none": collapsed() }}
            >
              <AiOutlineMenu size={24} />
              <span
                class="text-lg font-medium"
                classList={{ hidden: collapsed() }}
              >
                Collapse
              </span>
            </button>
          </div>
        </div>
        <button
          class="flex w-full flex-row justify-start items-center h-12 px-4 rounded-lg cursor-pointer  gap-4 hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600"
          onClick={() => handleLogout()}
          classList={{ "justify-center rounded-none": collapsed() }}
        >
          <AiOutlineLogout size={24} />
          <span class="text-lg font-medium" classList={{ hidden: collapsed() }}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
