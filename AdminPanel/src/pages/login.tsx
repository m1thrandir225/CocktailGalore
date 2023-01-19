import React, { useEffect, useContext } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { getCsrfToken } from "next-auth/react";
import Head from "next/head";
import Layout from "../layouts/Layout";
import { signIn } from "next-auth/react";
import { GlobalContext } from "../context/GlobalContext";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
const SignIn = ({ csrfToken }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { darkMode, toggleDarkMode } = useContext(GlobalContext);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const handleLogin = async () => {
    signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
    }).then((res) => {
      if (res.status === 200) {
        router.push("/admin");
      } else {
        setError("Invalid credentials");
      }
    });
  };
  useEffect(() => {
    if (error != null) {
      setTimeout(() => {
        setError(null);
      }, 3500);
    }
  }, [error]);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-screen h-screen transition-colors duration-150 ease-in-out bg-gray-100 dark:bg-gray-900">
        {error && (
          <p className="my-4 font-sans font-bold text-red-500 uppercase ">
            {error}
          </p>
        )}
        <div className="w-auto py-8 px-16 rounded-md drop-shadow-lg h-[500px] bg-gray-200 dark:bg-gray-800 flex flex-col justify-center items-center">
          <h1 className="my-4 text-3xl font-bold text-gray-700 dark:text-gray-300">
            Login
          </h1>

          <input
            name="username"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`px-4 py-2 my-4 text-gray-700 bg-gray-100 border-2 rounded-md outline-none  drop-shadow-sm focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-300 transition-colors ease-in-out duration-500 ${
              error != null
                ? "border-red-500"
                : "border-gray-100 dark:border-gray-700"
            }`}
          />
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`px-4 py-2 my-4 text-gray-700 bg-gray-100 border-2 rounded-md outline-none drop-shadow-sm focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-300 transition-colors ease-in-out duration-500 ${
              error != null
                ? "border-red-500"
                : "border-gray-100 dark:border-gray-700"
            }`}
          />
          <button
            type="button"
            onClick={() => handleLogin()}
            className="px-8 py-2 font-sans text-xl text-gray-700 transition-colors duration-100 ease-in-out bg-gray-300 rounded-md drop-shadow-sm dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-400 hover:text-gray-100 dark:hover:text-gray-800"
          >
            Continue
          </button>
        </div>
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-2 px-4 py-2 mt-8 text-xl text-gray-700 transition-colors duration-100 ease-in-out bg-gray-200 rounded-md shadow-lg mt-8font-sans drop-shadow-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-400 hover:text-gray-100 dark:hover:text-gray-800"
        >
          <AiOutlineHome size={20} />
          Go Back to Home
        </Link>
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
