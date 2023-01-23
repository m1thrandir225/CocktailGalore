import { AuthProvider } from "../context/AuthContex";
import { useOutlet } from "react-router-dom";

export const AuthLayout = () => {
  const outlet = useOutlet();
  return <AuthProvider>{outlet}</AuthProvider>;
};
