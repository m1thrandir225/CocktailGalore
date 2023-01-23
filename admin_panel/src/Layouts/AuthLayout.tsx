import { useNavigate, useOutlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContex";
import { useEffect } from "react";
export const AuthLayout = () => {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
};
