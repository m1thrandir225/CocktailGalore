import React from "react";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../api/users";
import { KeyedMutator } from "swr";

interface EditUserProfileImageProps {
  user: any;
  mutate: KeyedMutator<any>;
}

const EditUserProfileImage: React.FC<EditUserProfileImageProps> = ({
  user,
  mutate,
}) => {
  const {
    register,
    formState: { isSubmitSuccessful },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data: any) => {
    const response = await updateUserProfile(user?.id, data?.profileImage[0]);
    if (response.status === 200) {
      mutate(`/users/user/${user.id}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col justify-between items-start shadow-lg p-8 rounded-md w-[400px] gap-4 dark:bg-gray-700 hover:ring-2 transition-all ease-in-out duration-300 ${
        isSubmitSuccessful ? "ring-2 ring-green-400" : "ring-neutral-300"
      }`}
    >
      <h1 className="text-2xl font-bold font-sans text-gray-800 dark:text-gray-200">
        Profile Image
      </h1>
      <div className="flex flex-col items-start justify-start w-full">
        <img
          src={
            "https://galore-mobile-bucket.s3.eu-central-1.amazonaws.com/userProfileImages/" +
            user?.profileImage
          }
          alt="Current Profile Image"
          className="w-32 h-32 rounded-full object-cover place-self-center"
        />
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-lg text-gray-800 dark:text-gray-200 font-medium font-sans my-2">
            Select a file:
          </h1>
          <label className="block w-full">
            <span className="sr-only">Choose File</span>
            <input
              {...register("profileImage")}
              type="file"
              className="block  text-sm text-gray-500  file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 max-w-xs file:text-gray-800 hover:file:bg-amber-100"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="ring-2 ring-amber-400  hover:bg-amber-400  transition-all ease-in-out duration-200 rounded-md px-4 py-2 text-xl font-mediu font-sans text-gray-800 dark:text-gray-200 dark:hover:text-gray-800 font-bold shadow-md place-self-center"
      >
        Update Profile Image
      </button>
    </form>
  );
};

export default EditUserProfileImage;
