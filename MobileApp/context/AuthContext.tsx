import React from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../constants/globalTypes";

export const AuthContext = React.createContext<any | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [newUser, setNewUser] = React.useState<boolean>(false); //global newUser state
  const [user, setUser] = React.useState<User | null>(null); //global user state
  const [accessToken, setAccessToken] = React.useState<string | null>(null); //global accessToken for requests
  const [loading, setLoading] = React.useState<boolean>(false); //global loading state
  const [error, setError] = React.useState<string | null>(null); //global error state
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.100.20:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await response.json();
      setUser(data.user);
      setAccessToken(data.accessToken);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    //login user and set theaccessToken and user in the global state
    try {
      setLoading(true);
      const response = await fetch("http://192.168.100.20:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      setUser(data.user);
      setAccessToken(data.accessToken);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      await SecureStore.setItemAsync("accessToken", data.accessToken);
      await SecureStore.setItemAsync("refreshToken", data.refreshToken);
      console.log(data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
      setNewUser(false);
    }
  };
  const refreshAccessToken = async () => {
    //refresh the accessToken using the refreshToken
    try {
      setLoading(true);
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const response = await fetch("http://192.168.100.20:4000/refresh_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          refreshToken,
        }),
      });
      const data = await response.json();
      if (data.accessToken) {
        await SecureStore.setItemAsync("accessToken", data.accessToken);
        setAccessToken(data.accessToken);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const initialUserData = async () => {
      const user = await SecureStore.getItemAsync("user");
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (user && accessToken !== null) {
        setUser(JSON.parse(user));
        setAccessToken(accessToken);
      } else {
        setNewUser(true);
      }
    };
    initialUserData();
  }, []);
  React.useEffect(() => {
    if (error == "jwt expired") {
      refreshAccessToken();
    }
  }, [error]);
  return (
    <AuthContext.Provider
      value={{
        newUser,
        user,
        accessToken,
        loading,
        error,
        login,
        register,
        setNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
