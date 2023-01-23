import React, { useContext, createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginApi, logoutApi } from "../api/auth";
const AuthContext = createContext<any>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const { user, accessToken, refreshToken } = await loginApi(
        email,
        password,
      );
      if (user && accessToken && refreshToken) {
        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const logout = async () => {
    if (!user) return null;
    try {
      await logoutApi(user.id);
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
