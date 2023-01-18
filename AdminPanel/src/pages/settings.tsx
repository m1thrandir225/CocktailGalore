import SceneWrapper from "@/components/global/SceneWrapper";
import PanelLayout from "@/layouts/PanelLayout";
import SiteLayout from "@/layouts/SiteLayout";
import type { NextPageWithLayout } from "@/layouts/layoutTypes";

const SettingsPage: NextPageWithLayout = () => {
  return (
    <SceneWrapper title="Settings" subtitle="Settings Dashboard">
      <h1> Settings</h1>
    </SceneWrapper>
  );
};

SettingsPage.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
      <PanelLayout> {page} </PanelLayout>
    </SiteLayout>
  );
};

export default SettingsPage;
