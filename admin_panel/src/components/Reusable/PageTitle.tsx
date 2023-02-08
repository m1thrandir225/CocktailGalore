import React from "react";

interface IPageTitleProps {
  title: string;
}

const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  return (
    <h1 className="text-gray-800 dark:text-gray-200 font-bold font-sans text-2xl">
      {title}
    </h1>
  );
};
export default PageTitle;
