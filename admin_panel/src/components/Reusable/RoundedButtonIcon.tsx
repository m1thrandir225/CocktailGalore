import React from "react";

interface IRoundedButtonIconProps {
  icon: React.ReactNode;
  onClick: () => void;
  additionalClasses?: string;
  disabled?: boolean;
}

const RoundedButtonIcon: React.FC<IRoundedButtonIconProps> = ({
  icon,
  onClick,
  additionalClasses,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` w-8 h-8 bg-amber-400 text-gray-800 dark:text-gray-200 p-2 rounded-full ${
        disabled && "bg-opacity-50 cursor-not-allowed"
      } ${additionalClasses}`}
    >
      {icon}
    </button>
  );
};

export default RoundedButtonIcon;
