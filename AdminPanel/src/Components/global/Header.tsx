import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="flex flex-col items-start justify-start">
      <h1 className="text-4xl font-bold text-green-500 ">{props.title}</h1>
      <h2 className="text-xl text-gray-600 dark:text-gray-200">
        {props.subtitle}
      </h2>
    </div>
  );
};

export default Header;
