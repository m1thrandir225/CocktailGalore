import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AdminPage() {
  return (
    <AdminLayout>
      <h1> Admin</h1>
    </AdminLayout>
  );
}
export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}
export default AdminPage;
