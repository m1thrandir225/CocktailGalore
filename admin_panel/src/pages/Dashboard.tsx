import React from "react";
import PageTitle from "../components/Reusable/PageTitle";
import useSWR from "swr";
import { AiOutlineHeart } from "react-icons/ai";
function Dashboard() {
  const { data } = useSWR("/cocktails/cocktail?latest=true");
  console.log(data);
  return (
    <div>
      <PageTitle title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-lg p-4 dark:bg-gray-800 bg-white shadow-lg flex flex-col justify-start items-center gap-4 max-w-sm">
          <h1 className="text-2xl font-bold font-sans text-gray-800 dark:text-gray-200">
            Latest Cocktail
          </h1>
          <img
            src={`https://galore-mobile-bucket.s3.eu-central-1.amazonaws.com/cocktailImages/${data?.cocktails[0]?.image}`}
            alt="Cocktail"
            className="w-full h-auto rounded-md"
          />
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="text-xl font-sans font-medium text-gray-800 dark:text-gray-200">
              {data?.cocktails[0]?.name}
            </h1>
            <h1 className="flex flex-row justify-start items-center gap-2 text-lg font-sans text-gray-800 dark:text-gray-200">
              <AiOutlineHeart /> {data?.cocktails[0]?._count.favouriteBy}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
