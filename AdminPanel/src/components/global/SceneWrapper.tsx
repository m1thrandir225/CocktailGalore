import Head from "next/head";
import Topbar from "./Topbar";
import Header from "./Header";

interface SceneWrapperProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const SceneWrapper: React.FC<SceneWrapperProps> = (props) => {
  return (
    <div className="flex flex-col items-start justify-start w-screen h-screen px-8 bg-white dark:bg-gray-800 ">
      <Head>
        <title> Galore - {props.title}</title>
      </Head>
      <Topbar />
      <Header title={props.title} subtitle={props.subtitle} />
      <div className="my-4">{props.children}</div>
    </div>
  );
};

export default SceneWrapper;
