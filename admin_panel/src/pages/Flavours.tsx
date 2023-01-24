import React from "react";
import DataGrid from "../components/Reusable/DataGrid";

const columns = ["Name", "Description", "Flavour Type", "Flavour Group"];
const rows = [
  {
    name: "Apple",
    description: "Apple flavour",
    flavourType: "Fruit",
    flavourGroup: "Fruit",
  },
  {
    name: "Banana",
    description: "Banana flavour",
    flavourType: "Fruit",
    flavourGroup: "Fruit",
  },
  {
    name: "Blackcurrant",
    description: "Blackcurrant flavour",
    flavourType: "Fruit",
    flavourGroup: "Fruit",
  },
];

function Flavours() {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
  console.log(selectedRows);
  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-gray-800 dark:text-gray-200 font-bold font-sans text-2xl">
        Flavours
      </h1>
      <DataGrid
        columns={columns}
        rows={rows}
        setSelectRow={setSelectedRows}
        selectedRow={selectedRows}
      />
    </div>
  );
}

export default Flavours;
