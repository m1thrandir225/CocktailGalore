import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getSession } from "next-auth/react";
const FlavoursPage = ({ flavours }) => {
  return (
    <AdminLayout>
      {flavours.map((flavour) => {
        return <div key={flavour.id}>{flavour.name} </div>;
      })}
    </AdminLayout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const response = await fetch("http://localhost:4000/flavours/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + session.accessToken,
    },
  });
  const data = await response.json();
  console.log(data);
  return {
    props: {
      flavours: data.flavours || [],
    },
  };
}

export default FlavoursPage;
