import { Component } from "solid-js";
import { BiRegularSearch } from "solid-icons/bi";
import { AiOutlineUser } from "solid-icons/ai";
import { BsSun } from "solid-icons/bs";
import { BsMoonStars } from "solid-icons/bs";

import { A } from "@solidjs/router";
import { useGlobal } from "../../context/globalContext";
const Topbar: Component = () => {
  const { darkMode, actions } = useGlobal();
  return (
    <div class="flex flex-row justify-between items-center my-4 w-full">
      <div class="pt-2 relative  ">
        <input
          class="border-2 border-gray-100 bg-gray-100  h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none
           focus:border-gray-400 text-gray-700
           placeholder:text-gray-700
           dark:bg-gray-500 dark:text-gray-300
           dark:placeholder:text-gray-300
           dark:border-gray-500
           dark:focus:border-gray-400
          "
          placeholder="Search"
        />
        <button
          type="submit"
          class="absolute right-0 top-0 mt-5 mr-4 text-gray-700 dark:text-gray-300"
        >
          <BiRegularSearch />
        </button>
      </div>
      <div class="flex flex-row justify-evenly items-center gap-2">
        <button
          class="text-gray-700 dark:text-gray-300"
          onClick={() => actions.changeTheme()}
        >
          {darkMode() ? <BsSun size={20} /> : <BsMoonStars size={20} />}
        </button>
        <A href="/profile" class="text-gray-700 dark:text-gray-300">
          <AiOutlineUser size={20} />
        </A>
      </div>
    </div>
  );
};

export default Topbar;
