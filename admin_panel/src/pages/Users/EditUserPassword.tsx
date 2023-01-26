import { useForm, SubmitHandler } from "react-hook-form";
import type { KeyedMutator } from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserPasswordValidation } from "../../validation/userValidation";
import { userPasswordSchema } from "../../validation/userValidation";
import { updateUserPassword } from "../../api/users";

interface EditUserPasswordProps {
  user: any;
  mutate: KeyedMutator<any>;
}

const EditUserPassword: React.FC<EditUserPasswordProps> = ({
  user,
  mutate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm<UserPasswordValidation>({
    resolver: zodResolver(userPasswordSchema),
  });
  const onSubmit: SubmitHandler<UserPasswordValidation> = async (data) => {
    const response = await updateUserPassword(
      user?.id,
      data.currentPassword,
      data.newPassword,
    );
    if (response.status === 200) {
      mutate(`/users/user/${user.id}`);
      reset();
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
        User Password
      </h1>
      <div className="flex flex-col justify-start items-stretch gap-4 w-full">
        <div>
          <label
            htmlFor="currentPassword"
            className="text-lg text-gray-800 dark:text-gray-200 font-medium font-sans"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            placeholder="Enter your current password"
            {...register("currentPassword")}
            className="p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="text-lg text-gray-800 dark:text-gray-200 font-medium font-sans"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter a new password"
            {...register("newPassword")}
            className="p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-lg text-gray-800 dark:text-gray-200 font-medium font-sans"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
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

export default EditUserPassword;
