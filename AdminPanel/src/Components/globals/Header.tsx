import { Component } from "solid-js";

const Header: Component<{ title: string; subtitle: string }> = (props) => {
  return (
    <div class="flex flex-col justify-start items-start">
      <h1 class="text-4xl font-bold text-green-500 ">{props.title}</h1>
      <h2 class="text-xl text-gray-600 dark:text-gray-200">{props.subtitle}</h2>
    </div>
  );
};

export default Header;
