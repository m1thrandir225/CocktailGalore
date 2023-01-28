import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import type { User } from "../../types/apiTypes";
import useSWR from "swr";
import Loader from "../../components/Reusable/Loader";
import EditUserInformation from "./EditUserInformation";
import EditUserProfileImage from "./EditUserProfileImage";
import EditUserPassword from "./EditUserPassword";
import EditUserFlavours from "./EditUserFlavours";
import { UserResponse } from "../../api/users";
import EditUserLikedCocktails from "./EditUserLikedCocktails";
import EditUserReadInsights from "./EditUserReadInsights";

type ReturnSWR = {
  user: User;
};

function EditUser() {
  const { id } = useParams();
  const { data, isLoading, mutate, isValidating } = useSWR<ReturnSWR>(
    `/users/user/${id}`,
    {
      revalidateOnFocus: false,
    },
  );
  if (isLoading || !data?.user || isValidating)
    return <Loader loading={isLoading} />;
  return (
    <div className="flex flex-col items-start justify-start gap-8 w-full place-self-start h-full overflow-y-scroll">
      <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold font-sans text-left place-self-start">
        Editing:{" "}
        {!data ? "Loading..." : data.user.firstName + " " + data.user.lastName}
      </h1>
      {(isLoading || isValidating) && <Loader loading={isLoading} />}
      <div className="w-full grid grid-cols-3 gap-8 justify-items-center h-auto mt-2 mb-8">
        <EditUserFlavours user={data?.user} />
        <EditUserLikedCocktails user={data?.user} />
        <EditUserReadInsights user={data?.user} />
        <EditUserInformation user={data?.user} mutate={mutate} />
        <EditUserPassword user={data?.user} mutate={mutate} />
        <EditUserProfileImage user={data?.user} mutate={mutate} />
      </div>
      <Link
        to="/users"
        className="fixed right-14 bottom-4 rounded-md bg-amber-400 px-8 py-2 text-gray-800 font-bold"
      >
        Finish
      </Link>
    </div>
  );
}

export default EditUser;
