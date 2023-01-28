import { User } from "../../types/apiTypes";

const EditUserFlavours = ({ user }: { user: User }) => {
  return (
    <div
      className={`flex flex-col justify-start items-start shadow-lg p-8 rounded-md w-[400px] gap-4 dark:bg-gray-700 hover:ring-2 transition-all ease-in-out duration-300 `}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className=" text-2xl font-bold font-sans text-gray-800 dark:text-gray-200 w-full">
          Liked Flavours
        </h1>
        <p className="text-gray-800 dark:text-gray-200">
          {user.likedFlavours.length}
        </p>
      </div>
      <div className="flex flex-row justify-start items-center gap-4 w-full border-b-2 ">
        <p className="text-gray-800 dark:text-gray-200 font-sans">ID</p>
        <p className="text-gray-800 dark:text-gray-200 font-sans">Name</p>
      </div>
      <div className="flex flex-col justify-start items-stretch gap-2 w-full max-h-[280px] overflow-y-scroll">
        {user?.likedFlavours?.map((flavour) => {
          return (
            <div
              key={flavour.id}
              className="flex flex-row justify-start items-center gap-4 w-full border-l-2 p-2 dark:border-amber-200 border-amber-400"
            >
              <p className="text-gray-800 dark:text-gray-200 font-sans">
                {flavour.id}
              </p>
              <p className="text-gray-800 dark:text-gray-200 font-sans">
                {flavour.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditUserFlavours;
