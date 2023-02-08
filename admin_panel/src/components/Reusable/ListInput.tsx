import React from "react";
import { UseFormRegister } from "react-hook-form/dist/types";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CocktailValidation } from "../../validation/cocktailValidation";

interface IListInputProps {
  label: string;
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  register: UseFormRegister<CocktailValidation>;
  registerName: string;
  errors: any;
}

const ListInput: React.FC<IListInputProps> = ({
  label,
  items,
  setItems,
  register,
  registerName,
  errors,
}) => {
  const addNewItem = () => {
    setItems([...items, { id: items.length + 1, text: "" }]);
  };
  const removeItem = () => {
    setItems(items.slice(0, items.length - 1));
  };
  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      <label className="text-lg flex flex-row justify-between items-center w-full text-gray-800 dark:text-gray-200 font-medium font-sans">
        {label}
        <div className="flex flex-row justify-start items-center gap-2">
          <button
            className="bg-amber-400 text-gray-800 dark:text-gray-200 p-2 rounded-full"
            onClick={() => addNewItem()}
          >
            <AiOutlinePlus />
          </button>
          <button
            className={`bg-amber-400 text-gray-800 dark:text-gray-200 p-2 rounded-full ${
              items.length === 1 ? "opacity-50 cursor-not-allowed" : ""
            } `}
            onClick={() => removeItem()}
            disabled={items.length === 1}
          >
            <AiOutlineMinus />
          </button>
        </div>
      </label>
      {items.map((item, index) => (
        <div key={index} className="w-full">
          <input
            {...register(`${registerName}.${index}`)}
            type="text"
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].text = e.target.value;
              setItems(newItems);
            }}
            className={`p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200
            ${index === items.length - 1 ? "mb-4" : ""}
            `}
          />
          $
          {errors.index && (
            <p className="text-red-500 text-sm font-medium font-sans">
              {errors.index.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListInput;
