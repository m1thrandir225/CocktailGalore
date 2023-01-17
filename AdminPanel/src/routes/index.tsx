import { A } from "solid-start";
import Counter from "~/components/Counter";
import SceneWrapper from "~/components/global/SceneWrapper";

export default function Home() {
  return (
    <SceneWrapper title="Dashboard" subtitle="Welcome to the dashboard.">
      <h1> Hello World </h1>
    </SceneWrapper>
  );
}
