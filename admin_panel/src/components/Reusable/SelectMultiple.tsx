import React from "react";
import SwitchModule from "./SwitchModule";
interface ISelectMultiple {
  label: string;
  options: any[];
  selectedOptions: any[];
  setOptions: React.Dispatch<React.SetStateAction<any[]>>;
  loading?: boolean;
}
const SelectMultiple: React.FC<ISelectMultiple> = ({
  options,
  setOptions,
  label,
  selectedOptions,
  loading,
}) => {
  const handleSelect = (option: any) => {
    selectedOptions.includes(option)
      ? setOptions(selectedOptions.filter((r) => r !== option))
      : setOptions([...selectedOptions, option]);
  };
  if (loading) return null;
  return (
    <div className="w-full max-h-[724px] flex flex-col justify-start shadow-md p-4 rounded-md items-start gap-2 overflow-y-scroll dark:bg-gray-700">
      <h1 className="text-xl font-bold font-sans dark:text-gray-200 text-gray-800">
        Select {label}
      </h1>
      {options.map((option, index) => (
        <div
          key={index}
          className="flex flex-row justify-start items-center gap-2"
        >
          <SwitchModule
            isChecked={selectedOptions.includes(option)}
            onChange={() => handleSelect(option)}
          />
          <p className="text-lg font-medium font-sans text-gray-800 dark:text-gray-200">
            {option.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SelectMultiple;
