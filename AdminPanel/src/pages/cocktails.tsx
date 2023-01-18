import SceneWrapper from "../components/global/SceneWrapper";
import PanelLayout from "../layouts/PanelLayout";
import SiteLayout from "../layouts/SiteLayout";
import { NextPageWithLayout } from "../layouts/layoutTypes";
import React from "react";

const CocktailsPage: NextPageWithLayout = () => {
  return (
    <SceneWrapper title="Cocktails" subtitle="Cocktail dashboard">
      <h1> Cocktails</h1>
    </SceneWrapper>
  );
};

CocktailsPage.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
      <PanelLayout> {page} </PanelLayout>
    </SiteLayout>
  );
};
export default CocktailsPage;
