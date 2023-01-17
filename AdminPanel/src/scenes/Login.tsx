import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";
import { AiOutlineLogin } from "solid-icons/ai";
import { useGlobal } from "../context/globalContext";
import { BsSun } from "solid-icons/bs";
import { BsMoonStars } from "solid-icons/bs";

const Login: Component<{ setAuth: (logged: boolean) => void }> = (props) => {
  const { darkMode, actions } = useGlobal();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (email() == "" || password() == "") return;
    if (email() == "test@test.com" && password() == "test") {
      localStorage.setItem("isAuth", "true");
      navigate("/", { replace: true });
    }
  };
  createEffect(() => {
    console.log(darkMode());
  });
  return (
    <div class="flex justify-center items-center w-screen h-screen bg-gray-100 dark:bg-gray-900 transition-all ease-in duration-200">
      <div class="flex flex-col justify-center items-center  bg-gray-200 px-4 py-8 rounded-sm dark:bg-gray-800 transition-colors ease-in duration-200">
        <h1 class="font-sans font-bold text-2xl text-gray-700 my-2 dark:text-gray-300">
          Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          class="m-2 p-4 rounded-md focus:outline-none text-gray-700 placeholder:text-gray-400 dark:text-gray-800 dark:placeholder:text-gray-800 dark:bg-gray-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          class="m-2 p-4 rounded-md focus:outline-none text-gray-700 placeholder:text-gray-400 dark:text-gray-800 dark:placeholder:text-gray-800 dark:bg-gray-200"
        />
        <button
          onClick={() => handleLogin()}
          class="flex flex-row justify-start items-center gap-2 text-gray-700 py-2 px-4 my-2 rounded-md hover:bg-gray-300 transition-all ease-in-out duration-150 dark:text-gray-300 dark:hover:text-gray-700"
        >
          <span class="font-medium text-xl font-sans"> Continue </span>
          <AiOutlineLogin size={20} />
        </button>
        <button
          type="button"
          onClick={() => actions.changeTheme()}
          class="dark:text-gray-200 text-gray-800 absolute right-8 top-8 "
        >
          {darkMode() ? <BsSun size={24} /> : <BsMoonStars size={24} />}
        </button>
      </div>
    </div>
  );
};

export default Login;
