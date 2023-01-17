import { A, useLocation } from "@solidjs/router";
import { Component, JSX, createEffect } from "solid-js";

const NavItem: Component<{
  Icon: Component;
  to: string;
  title: string;
  isCollapsed?: boolean;
}> = (props) => {
  const { Icon, to, title } = props;
  const currentLocation = useLocation();
  return (
    <A
      href={to}
      class="flex flex-row justify-start items-center h-12 px-4 rounded-lg cursor-pointer hover:bg-gray-300 transition-all ease-out duration-100 dark:hover:bg-gray-600"
      classList={{
        "justify-center rounded-none": props.isCollapsed,
        "bg-green-300 dark:bg-green-600": currentLocation.pathname === to,
      }}
    >
      <Icon />
      <h1
        class="ml-4 text-sm font-medium transition-transform ease-out-out duration-500 text-gray-700 dark:text-gray-200"
        classList={{ hidden: props.isCollapsed }}
      >
        {title}
      </h1>
    </A>
  );
};

export default NavItem;
