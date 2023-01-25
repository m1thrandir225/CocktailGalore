import React from "react";
import DataGrid from "../components/Reusable/DataGrid";
import useSWR from "swr";
import Loader from "../components/Reusable/Loader";
import { GrFormAdd } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const columns = ["Id", "Name"];

function Flavours() {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const { data, isLoading } = useSWR("/flavours");
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-gray-800 dark:text-gray-200 font-bold font-sans text-2xl">
        Flavours
      </h1>
      <div className="flex flex-row justify-between items-center w-full my-4">
        <div className="flex flex-row items-center">
          <button className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-white">
            <GrFormAdd size={24} color="#ffffff" />
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <DataGrid
          columns={columns}
          rows={data?.flavours}
          setSelectRow={setSelectedRows}
          selectedRow={selectedRows}
        />
      )}
    </div>
  );
}

export default Flavours;
