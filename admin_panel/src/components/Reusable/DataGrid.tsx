import React from "react";
import { Switch } from "@headlessui/react";
import SwitchModule from "./SwitchModule";
interface IDataGrid {
  columns: string[];
  rows: any[];
  selectedRow: any[];
  setSelectRow: React.Dispatch<React.SetStateAction<any>>;
  loading?: boolean;
}

const DataGrid: React.FC<IDataGrid> = ({
  columns,
  selectedRow,
  rows,
  setSelectRow,
  loading,
}) => {
  const handleSelect = (row: any) => {
    selectedRow.includes(row)
      ? setSelectRow(selectedRow.filter((r) => r !== row))
      : setSelectRow([...selectedRow, row]);
  };
  const handleSelectAll = () => {
    selectedRow.length === rows.length
      ? setSelectRow([])
      : setSelectRow(() => rows.map((row) => row));
  };
  if (loading) {
    const loadingRows = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const loadingColumns = [1, 2, 3, 4];
    return (
      <div className="relative overflow-x-auto my-4 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="row">
                <hr className="w-sm p-2 rounded-full dark:bg-gray-200  bg-gray-400 animate-pulse mx-6 my-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
              </th>
              {loadingColumns.map((column, index) => (
                <th key={index} scope="row">
                  <hr className="w-sm p-2 rounded-full dark:bg-gray-200  bg-gray-400 animate-pulse mx-6 my-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loadingRows?.map((row, index) => (
              <tr
                key={row}
                className={`border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-colors ease-in-out duration-150`}
              >
                <td scope="row">
                  <hr className="w-sm p-1 rounded-full dark:bg-gray-200  bg-gray-400 animate-pulse mx-6 my-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </td>
                <td scope="row">
                  <hr className="w-sm p-1 rounded-full dark:bg-gray-200  bg-gray-400 animate-pulse mx-6 my-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </td>
                <td scope="row">
                  <hr className="w-sm p-1 rounded-full dark:bg-gray-200  bg-gray-400 animate-pulse mx-6 my-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </td>
                <td scope="row">
                  <hr className="w-sm p-1 rounded-full dark:bg-gray-200  bg-gray-400 animate-pulse mx-6 my-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </td>
                <td scope="row">
                  <hr className="w-sm p-1 rounded-full dark:bg-gray-200  bg-gray-400 animate-pulse mx-6 my-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="relative overflow-x-auto my-4 shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  transition-all ease-in-out duration-150">
          <tr>
            <th
              scope="col"
              className="flex items-center justify-start px-6 py-3"
            >
              <SwitchModule
                isChecked={
                  selectedRow.length === rows?.length && rows?.length > 0
                }
                onChange={() => handleSelectAll()}
              />
            </th>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3  transition-all ease-in-out duration-150"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr
              key={index}
              className={` border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-all ease-in-out duration-150 ${
                selectedRow.includes(row)
                  ? "bg-amber-100 dark:bg-gray-500 bg-opacity-50"
                  : "bg-white dark:bg-gray-900"
              }`}
            >
              <td
                scope="row"
                className="flex items-center justify-start px-6 py-3"
              >
                <SwitchModule
                  isChecked={selectedRow.includes(row)}
                  onChange={() => handleSelect(row)}
                />
              </td>
              {Object.values(row).map((value: any, index: number) => (
                <td
                  key={index}
                  scope="row"
                  className="truncate max-w-md px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  transition-all ease-in-out duration-150"
                >
                  {typeof value === "object" ? value.join(", ") : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
