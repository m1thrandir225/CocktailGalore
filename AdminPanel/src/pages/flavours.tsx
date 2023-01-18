import SceneWrapper from "@/components/global/SceneWrapper";
import PanelLayout from "@/layouts/PanelLayout";
import SiteLayout from "@/layouts/SiteLayout";
import type { NextPageWithLayout } from "@/layouts/layoutTypes";

const FlavoursPage: NextPageWithLayout = () => {
  return (
    <SceneWrapper title="Flavours" subtitle="Flavours Dashboard">
      <h1> Flavours</h1>
    </SceneWrapper>
  );
};

FlavoursPage.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
      <PanelLayout> {page} </PanelLayout>
    </SiteLayout>
  );
};

export default FlavoursPage;
