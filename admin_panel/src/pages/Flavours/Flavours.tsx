import React from "react";
import DataGrid from "../../components/Reusable/DataGrid";
import useSWR from "swr";
import Loader from "../../components/Reusable/Loader";

import { MdDeleteOutline, MdAdd, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const columns = ["Id", "Name"];

function Flavours() {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  const { data, isLoading } = useSWR("/flavours");
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/flavours/flavour/${selectedRows[0].id}`);
  };
  const handleAdd = () => {
    navigate("/flavours/new");
  };
  const handleDelete = () => {};
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-gray-800 dark:text-gray-200 font-bold font-sans text-2xl">
        Flavours
      </h1>
      <div className="flex flex-row justify-between items-center w-full my-4">
        <div className="flex flex-row items-center gap-4">
          <button
            className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-gray-800  dark:text-gray-100 shadow-lg"
            onClick={handleAdd}
          >
            <MdAdd size={24} />
          </button>
          <button
            disabled={selectedRows.length === 0}
            className={`w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-gray-800  dark:text-gray-100 shadow-lg ${
              selectedRows.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleDelete}
          >
            <MdDeleteOutline size={24} />
          </button>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button
            disabled={selectedRows.length !== 1}
            className={`w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-gray-800  dark:text-gray-100 shadow-lg ${
              selectedRows.length !== 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleEdit}
          >
            <MdEdit size={24} />
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
