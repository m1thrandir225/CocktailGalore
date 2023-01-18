import SceneWrapper from "../components/global/SceneWrapper";
import PanelLayout from "../layouts/PanelLayout";
import SiteLayout from "../layouts/SiteLayout";
import type { NextPageWithLayout } from "../layouts/layoutTypes";

const UsersPage: NextPageWithLayout = () => {
  return (
    <SceneWrapper title="Users" subtitle="Users Dashboard">
      <h1> Users</h1>
    </SceneWrapper>
  );
};

UsersPage.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
      <PanelLayout> {page} </PanelLayout>
    </SiteLayout>
  );
};

export default UsersPage;
