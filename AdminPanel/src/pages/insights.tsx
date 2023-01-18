import SceneWrapper from "@/components/global/SceneWrapper";
import PanelLayout from "@/layouts/PanelLayout";
import SiteLayout from "@/layouts/SiteLayout";
import type { NextPageWithLayout } from "@/layouts/layoutTypes";

const InsightsPage: NextPageWithLayout = () => {
  return (
    <SceneWrapper title="Insights" subtitle="Insights Dashboard"></SceneWrapper>
  );
};

export default InsightsPage;

InsightsPage.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
      <PanelLayout> {page} </PanelLayout>
    </SiteLayout>
  );
};
