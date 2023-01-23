import React, {
  useContext,
  createContext,
  useMemo,
  useEffect,
  useState,
} from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginApi, logoutApi } from "../api/auth";
import { redirect, useNavigate } from "react-router-dom";

export const AuthContext = createContext<any | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false,
  );
  const [error, setError] = useState<any | null>(null);
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);

      if (response) {
        const { user, accessToken, refreshToken } = response.data;
        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setError("Invalid credentials");
      }
      if (err.response.status === 404) {
        setError(err.response.data.message);
      }
    }
  };
  const logout = async () => {
    if (!user) return null;
    try {
      await logoutApi(user.id);
      await setUser(null);
      await setAccessToken(null);
      await setRefreshToken(null);
      await setIsAuthenticated(false);
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };
  useEffect(() => {
    if (error != null) {
      setTimeout(() => {
        setError(null);
      }, 3500);
    }
  }, [error]);
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
      error,
    }),
    [user, login, logout, isAuthenticated, error],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
