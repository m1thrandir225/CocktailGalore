import React from "react";
import useSWR from "swr";
import DataGrid from "../../components/Reusable/DataGrid";
import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { CocktailCategory } from "../../types/apiTypes";
import PageTitle from "../../components/Reusable/PageTitle";

const columns = ["Id", "Name"];

function CategoryPage() {
  const [selectedRows, setSelectedRows] = React.useState<CocktailCategory[]>(
    [],
  );
  const { data, isLoading, mutate, isValidating } = useSWR("/categories");
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/categories/category/${id}`);
  };
  const handleAdd = () => {
    navigate("/categories/category/new");
  };
  const handleDelete = async () => {};

  return (
    <div className="flex flex-col w-full h-full">
      <PageTitle title="Cocktail Categories" />
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
            onClick={() => handleEdit(selectedRows[0].id)}
          >
            <MdEdit size={24} />
          </button>
        </div>
      </div>
      <DataGrid
        columns={columns}
        rows={data?.categories}
        setSelectRow={setSelectedRows}
        selectedRow={selectedRows}
        loading={isLoading || isValidating}
      />
    </div>
  );
}

export default CategoryPage;
