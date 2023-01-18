import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { NextPageWithLayout } from "../layouts/layoutTypes";
import { ReactElement } from "react";
import SiteLayout from "../layouts/SiteLayout";
import PanelLayout from "../layouts/PanelLayout";
import SceneWrapper from "../components/global/SceneWrapper";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPageWithLayout = () => {
  return (
    <SceneWrapper title="Dashboard" subtitle="Welcome to your dashboard">
      <h1> Dashboard </h1>
    </SceneWrapper>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <SiteLayout>
      <PanelLayout>{page}</PanelLayout>
    </SiteLayout>
  );
};

export default Home;
