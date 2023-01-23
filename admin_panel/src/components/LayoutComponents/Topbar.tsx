import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsSun, BsMoonStars } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Topbar: React.FC = () => {
  const darkMode = useTheme();
  return (
    <div className="flex flex-row items-center justify-between w-full my-4">
      <div className="relative pt-2 ">
        <input
          className="h-10 px-5 pr-16 text-sm text-gray-700 bg-gray-100 border-2 border-gray-100 rounded-lg focus:outline-none focus:border-gray-400 placeholder:text-gray-700 dark:bg-gray-500 dark:text-gray-300 dark:placeholder:text-gray-300 dark:border-gray-500 dark:focus:border-gray-400 "
          placeholder="Search"
        />
        <button
          title="Search"
          type="button"
          className="absolute top-0 right-0 mt-5 mr-4 text-gray-700 dark:text-gray-300"
        >
          <BiSearch />
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 justify-evenly">
        <button
          className="text-gray-700 dark:text-gray-300"
          onClick={() => darkMode?.setDarkMode(!darkMode?.darkMode)}
        >
          {darkMode ? <BsSun size={20} /> : <BsMoonStars size={20} />}
        </button>
        <Link to="/profile" className="text-gray-700 dark:text-gray-300">
          <AiOutlineUser size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
