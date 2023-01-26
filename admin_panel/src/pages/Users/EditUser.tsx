import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Loader from "../../components/Reusable/Loader";
import EditUserInformation from "./EditUserInformation";
import EditUserProfileImage from "./EditUserProfileImage";
function EditUser() {
  const { id } = useParams();
  const { data, isLoading } = useSWR(`/users/user/${id}`);
  return (
    <div className="flex flex-col items-center justify-start gap-8 w-auto place-self-start">
      <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold font-sans text-left place-self-start">
        Editing User, {data?.user?.firstName + " " + data?.user?.lastName}
      </h1>
      {isLoading && <Loader loading={isLoading} />}
      <div className="flex flex-row justify-center items-center gap-4 flex-wrap w-full">
        <EditUserInformation user={data?.user} />
        <EditUserProfileImage user={data?.user} />
      </div>
    </div>
  );
}

export default EditUser;
