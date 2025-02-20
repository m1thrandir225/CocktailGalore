import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserValidation, userSchema } from "../../validation/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserData } from "../../api/users";
import { KeyedMutator } from "swr";

interface EditUserInformationProps {
  user: any;
  mutate: KeyedMutator<any>;
}

const EditUserInformation: React.FC<EditUserInformationProps> = ({
  user,
  mutate,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
    register,
    setValue,
  } = useForm<UserValidation>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserValidation> = async (data) => {
    console.log(data);
    const response = await updateUserData(user?.id, data);
    if (response.status === 200) {
      mutate(`/users/user/${user.id}`);
      setValue("firstName", "");
      setValue("lastName", "");
      setValue("email", "");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col justify-between items-start shadow-lg p-8 rounded-md w-[400px] gap-4 dark:bg-gray-700 hover:ring-2 transition-all ease-in-out duration-300 ${
        isSubmitSuccessful ? "ring-2 ring-green-400" : "ring-neutral-300"
      }`}
    >
      <h1 className="text-2xl font-bold font-sans text-gray-800 dark:text-gray-200 w-full">
        Basic Information
      </h1>
      <div className="flex flex-col justify-start items-stretch gap-4 w-full">
        <div>
          <label
            htmlFor="firstName"
            className="text-lg text-gray-800 dark:text-gray-200 font-medium font-sans"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder={user?.firstName}
            {...register("firstName")}
            className="p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="text-lg text-gray-800 dark:text-gray-200 font-medium font-sans"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder={user?.lastName}
            {...register("lastName")}
            className="p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-lg text-gray-800 dark:text-gray-200 font-medium font-sans"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder={user?.email}
            {...register("email")}
            className="p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200"
          />
        </div>
      </div>
      <button
        type="submit"
        className="ring-2 ring-amber-400  hover:bg-amber-400  transition-all ease-in-out duration-200 rounded-md px-4 py-2 text-xl font-mediu font-sans text-gray-800 dark:text-gray-200 dark:hover:text-gray-800 font-bold shadow-md place-self-center"
      >
        Update Information
      </button>
    </form>
  );
};

export default EditUserInformation;
