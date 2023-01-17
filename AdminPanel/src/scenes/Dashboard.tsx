import { Component } from "solid-js";
import Header from "../Components/globals/Header";
import Topbar from "../Components/globals/Topbar";
import SceneWrapper from "../Components/globals/SceneWrapper";

const Dashboard: Component = () => {
  return (
    <SceneWrapper title="Dashboard" subtitle="Welcome to the dashboard.">
      <h1> Hello World </h1>
    </SceneWrapper>
  );
};

export default Dashboard;
