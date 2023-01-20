import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getSession } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Flavour } from "../api/backendTypes";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableHead,
  Card,
  Title,
  Toggle,
  ToggleItem,
} from "@tremor/react";
import { useEffect } from "react";
import { BsCheck2All, BsCheck2 } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

const FlavoursPage = ({
  flavours,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selected, setSelected] = React.useState<Flavour[]>([]);
  const handleSelectAll = () => {
    if (selected.length == flavours.length || selected.length > 0) {
      setSelected([]);
    } else {
      setSelected(flavours);
    }
  };

  const handleSelect = (flavour: Flavour) => {
    if (selected.includes(flavour)) {
      setSelected(selected.filter((item) => item !== flavour));
    } else {
      setSelected([...selected, flavour]);
    }
  };
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <AdminLayout>
      <Card shadow={true} decoration="left" decorationColor="green">
        <Title> Flavours </Title>
        <Table marginTop="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>
                <Toggle
                  defaultValue={false}
                  onValueChange={() => handleSelectAll()}
                  value={selected.length == flavours.length}
                  color="green"
                >
                  <ToggleItem value={true} icon={BsCheck2All} />
                  <ToggleItem value={false} icon={AiOutlineCloseCircle} />
                </Toggle>
              </TableHeaderCell>
              <TableHeaderCell>Id</TableHeaderCell>
              <TableHeaderCell textAlignment="text-left">
                Flavour
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flavours.map((flavour) => (
              <TableRow key={flavour.id}>
                <TableCell>
                  <Toggle
                    defaultValue={selected.includes(flavour)}
                    value={selected.includes(flavour)}
                    onValueChange={() => handleSelect(flavour)}
                    color="green"
                  >
                    <ToggleItem value={true} icon={BsCheck2} />
                    <ToggleItem value={false} icon={AiOutlineCloseCircle} />
                  </Toggle>
                </TableCell>
                <TableCell>{flavour.id}</TableCell>
                <TableCell>{flavour.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  flavours: Flavour[];
}> = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
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
};

export default FlavoursPage;
