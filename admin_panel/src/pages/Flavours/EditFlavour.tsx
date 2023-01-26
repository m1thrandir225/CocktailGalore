import React from "react";
import Loader from "../../components/Reusable/Loader";
import useSWR from "swr";
import { useParams } from "react-router-dom";
function EditFlavour() {
  const { id } = useParams();
  const { data: flavour } = useSWR(`/flavours/flavour/${id}`);
  return <div> h1 </div>;
}

export default EditFlavour;
