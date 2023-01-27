import { useOutlet } from "react-router-dom";
import React from "react";
export default function DefaultLayout() {
  const outlet = useOutlet();
  return <>{outlet}</>;
}
