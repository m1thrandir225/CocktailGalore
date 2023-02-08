import { Switch } from "@headlessui/react";
import React from "react";

interface ISwitchModule {
  isChecked: boolean;
  onChange: () => void;
}

const SwitchModule: React.FC<ISwitchModule> = ({ isChecked, onChange }) => {
  return (
    <Switch
      checked={isChecked}
      onChange={onChange}
      className={`${
        isChecked ? "bg-amber-400 dark:bg-amber-400" : "bg-gray-500"
      }
  relative inline-flex h-[20px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 hover:border-2 hover:border-gray-50 hover:border-opacity-50`}
    >
      <span
        aria-hidden="true"
        className={`${isChecked ? "translate-x-[30px]" : "translate-x-0"}
    pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};

export default SwitchModule;
