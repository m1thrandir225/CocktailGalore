import React from "react";
import { useAuth } from "./context/AuthContex";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useAuth();
  const handleLogin = async () => {
    await login(email, password);
  };
  return (
    <div className="flex flex-col justify-center items-center  bg-white h-screen w-screen dark:bg-gray-900">
      <div className="w-auto h-auto bg-gray-200 dark:bg-gray-800 p-12 rounded-md shadow-lg flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-bold font-sans text-gray-800 dark:text-gray-200">
          Login
        </h1>
        <input
          type="email"
          className="w-full h-8 py-5 px-4  rounded-sm focus:outline-none text-gray-800 dark:text-gray-600"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="w-full h-8 py-5 px-4  rounded-sm focus:outline-none text-gray-800 dark:text-gray-600"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="button"
          className="bg-gray-600 dark:bg-gray-400 rounded-md py-2 px-8 text-gray-800 hover:bg-gray-700 hover:dark:bg-gray-500 hover:dark:text-gray-200 transition-all duration-300 ease-in-out my-4"
          onClick={() => handleLogin()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
