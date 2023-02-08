import { useState } from "react";
import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import Loader from "../../components/Reusable/Loader";
import DataGrid from "../../components/Reusable/DataGrid";
import { deleteUsers } from "../../api/users";
import PageTitle from "../../components/Reusable/PageTitle";
const columns = [
  "Id",
  "Email",
  "First Name",
  "Last Name",
  "Role",
  "Profile Image",
];

function Users() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const navigate = useNavigate();
  const { data, isLoading, isValidating, mutate } = useSWR("/users");

  const handleEdit = () => {
    navigate(`/users/user/${selectedRows[0].id}`);
  };
  const handleDelete = async () => {
    const ids = selectedRows.map((row) => row.id);
    const response = await deleteUsers(ids);
    if (response.status === 200) {
      setSelectedRows([]);
      setTimeout(() => {
        mutate("/users");
      }, 3000);
    }
  };
  return (
    <div className="flex flex-col w-full h-full">
      <PageTitle title="Users" />
      <div className="flex flex-row justify-between items-center w-full my-4">
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
        <div className="flex flex-row items-center gap-4">
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
      </div>
      <DataGrid
        columns={columns}
        rows={data?.users}
        setSelectRow={setSelectedRows}
        selectedRow={selectedRows}
        loading={isLoading || isValidating}
      />
    </div>
  );
}

export default Users;
