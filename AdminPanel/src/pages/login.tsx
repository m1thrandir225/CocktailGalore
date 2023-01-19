import React, { useEffect, useContext } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { getCsrfToken } from "next-auth/react";
import Head from "next/head";
import Layout from "../layouts/Layout";
import { signIn } from "next-auth/react";
import { GlobalContext } from "../context/GlobalContext";
const SignIn = ({ csrfToken }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { darkMode, toggleDarkMode } = useContext(GlobalContext);
  const handleLogin = async () => {
    signIn("credentials", {
      username: email,
      password: password,
      callbackUrl: `${window.location.origin}/admin`,
    });
  };
  return (
    <Layout>
      <div className="flex items-center justify-center w-screen h-screen transition-colors duration-150 ease-in-out bg-gray-100 dark:bg-gray-900">
        <div className="w-auto py-8 px-16 rounded-md drop-shadow-lg h-[500px] bg-gray-200 dark:bg-gray-800 flex flex-col justify-center items-center">
          <h1 className="my-4 text-3xl font-bold text-gray-700 dark:text-gray-300">
            Login
          </h1>
          <input
            name="username"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-2 my-4 text-gray-700 bg-gray-100 border-2 rounded-md outline-none dark:border-gray-700 drop-shadow-sm focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-300"
          />
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-2 my-4 text-gray-700 bg-gray-100 border-2 rounded-md outline-none dark:border-gray-700 drop-shadow-sm focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-300"
          />
          <button
            type="button"
            onClick={() => handleLogin()}
            className="px-8 py-2 font-sans text-xl text-gray-700 transition-colors duration-100 ease-in-out bg-gray-300 rounded-md drop-shadow-sm dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-400 hover:text-gray-100 dark:hover:text-gray-800"
          >
            Continue
          </button>
        </div>
        <button
          type="button"
          className="absolute text-gray-800 top-10 right-16 dark:text-gray-200"
          onClick={() => toggleDarkMode()}
        >
          {darkMode ? <BsSun size={20} /> : <BsMoonStars size={20} />}
        </button>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default SignIn;
