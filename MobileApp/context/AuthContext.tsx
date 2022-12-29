import * as React from "react";
import * as SecureStore from "expo-secure-store";

export interface IAuthContext {
  jwt: string | null;
  user: any | null;
  setUser: (user: any) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = React.useState<any>(null);
  const [jwt, setJwt] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string>("");
  const [refreshToken, setRefreshToken] = React.useState<string>("");

  const login = async (email: string, password: string) => {
    const response = await fetch("http://192.168.100.20:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    await SecureStore.setItemAsync("jwt", response.jwt);
    setJwt(response.jwt);
    setUser(response.user);
  };
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });
      const data = await response.json();

      if (data.message === "success") {
        setJwt("");
        setUser(null);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      const data = await response.json();
      setJwt(data.jwt);
      setUser(data.user);
    } catch (error: any) {
      setError(error.message);
    }
  };
  const resetPassword = async (email: string) => {};
  const updateEmail = async (email: string) => {};
  const updatePassword = async (password: string) => {};

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        jwt,
        user,
        setUser,
        register,
        resetPassword,
        updateEmail,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
