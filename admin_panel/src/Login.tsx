import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "react-auth-kit";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { loginApi } from "./api/auth";
import { useTheme } from "./context/ThemeContext";
import { LoginSchema, loginSchema } from "./validation/loginValidation";
import ClipLoader from "react-spinners/ClipLoader";
import Loader from "./components/Reusable/Loader";
import { useState } from "react";

export const Login = () => {
  const theme = useTheme();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitSuccessful },
    setError,
    resetField,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginApi(data.email, data.password);
      signIn({
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        expiresIn: 60 + 30,
        authState: { user: response.data.user },
        tokenType: "Bearer",
      });
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/");
    } catch (error: any) {
      if (error.response.status === 404) {
        if (error.response.data.message === "User not found, invalid email") {
          setError("email", {
            type: "manual",
            message: error.response.data.message,
          });
          resetField("email", { keepError: true });
        } else {
          setError("password", {
            type: "manual",
            message: error.response.data.message,
          });
          resetField("password", { keepError: true });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-white h-screen w-screen dark:bg-gray-900">
      {isLoading && <Loader loading={isLoading} />}
      <div className="flex flex-col items-center justify-center w-screen h-screen transition-colors duration-150 ease-in-out bg-gray-100 dark:bg-gray-900">
        <div className="w-auto py-8 px-16 rounded-md drop-shadow-lg h-[500px] bg-gray-200 dark:bg-gray-800 flex flex-col justify-center items-center">
          <h1 className="my-4 text-3xl font-bold text-gray-700 dark:text-gray-300">
            Login
          </h1>
          <div> {errors.email?.message && errors.password?.message}</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center"
          >
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Email"
              className={`px-4 py-2 mt-4 text-gray-700 bg-gray-100 border-2 rounded-md outline-none  drop-shadow-sm focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-300 transition-colors ease-in-out duration-500 ${
                errors.email != null
                  ? "border-red-500"
                  : "border-gray-100 dark:border-gray-700"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-4 mt-2 text-left self-start">
                {errors.email?.message}
              </p>
            )}
            <input
              id="password"
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`px-4 py-2 mt-4 text-gray-700 bg-gray-100 border-2 rounded-md outline-none drop-shadow-sm focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-300 transition-colors ease-in-out duration-500 ${
                errors.password != null
                  ? "border-red-500"
                  : "border-gray-100 dark:border-gray-700"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm text-left mb-4 mt-2 self-start">
                {errors.password?.message}
              </p>
            )}
            <button
              type="submit"
              className="px-8 py-2 mt-4 font-sans text-xl text-gray-700 transition-colors duration-100 ease-in-out bg-gray-300 rounded-md drop-shadow-sm dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-400 hover:text-gray-100 dark:hover:text-gray-800"
            >
              Continue
            </button>
          </form>
        </div>

        <button
          type="button"
          className="absolute text-gray-800 top-10 right-16 dark:text-gray-200"
          onClick={() => theme?.setDarkMode(!theme.darkMode)}
        >
          {theme?.darkMode ? <BsSun size={20} /> : <BsMoonStars size={20} />}
        </button>
      </div>
    </div>
  );
};
