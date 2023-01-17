import { Component } from "solid-js";
import Header from "./Header";
import Topbar from "./Topbar";
import { Title } from "solid-start";

interface Props {
  children: any;
  title: string;
  subtitle: string;
}

const SceneWrapper: Component<Props> = (props) => {
  return (
    <div class="bg-white w-screen h-screen flex flex-col justify-start items-start px-8 dark:bg-gray-800 ">
      <Title> Galore - {props.title}</Title>
      <Topbar />
      <Header title={props.title} subtitle={props.subtitle} />
      <div class="my-4">{props.children}</div>
    </div>
  );
};

export default SceneWrapper;
