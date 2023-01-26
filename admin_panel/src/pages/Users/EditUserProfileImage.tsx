import React from "react";
import { useForm } from "react-hook-form";

interface EditUserProfileImageProps {
  user: any;
}

const EditUserProfileImage: React.FC<EditUserProfileImageProps> = ({
  user,
}) => {
  const {
    register,
    formState: { isSubmitSuccessful },
  } = useForm();
  return (
    <form
      className={`flex flex-col justify-center items-start shadow-lg p-8 rounded-md w-auto gap-4 dark:bg-gray-700 hover:ring-2 transition-all ease-in-out duration-300 ${
        isSubmitSuccessful ? "ring-2 ring-green-400" : "ring-neutral-300"
      }`}
    >
      <input type={"file"} {...register("profileImage")} />
    </form>
  );
};

export default EditUserProfileImage;
