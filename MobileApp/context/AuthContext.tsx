import React from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../constants/globalTypes";

interface IAuthContext {
  newUser: boolean;
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateUserData: (user: User) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

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
    console.log(firstName, lastName, email, password);
    try {
      setLoading(true);
      const response = await fetch(
        `https://galore-cocktails-more-production.up.railway.app/register`,
        {
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
        },
      );
      const data = await response.json();
      setUser(data.user);
      setAccessToken(data.accessToken);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      await SecureStore.setItemAsync(
        "accessToken",
        JSON.stringify(data.accessToken),
      );
      await SecureStore.setItemAsync(
        "refreshToken",
        JSON.stringify(data.refreshToken),
      );
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
      const response = await fetch(
        `https://galore-cocktails-more-production.up.railway.app/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const data = await response.json();
      setUser(data.user);
      setAccessToken(data.accessToken);
      await SecureStore.setItemAsync("user", JSON.stringify(data.user));
      await SecureStore.setItemAsync(
        "accessToken",
        JSON.stringify(data.accessToken),
      );
      await SecureStore.setItemAsync(
        "refreshToken",
        JSON.stringify(data.refreshToken),
      );
      console.log(data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
      setNewUser(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://galore-cocktails-more-production.up.railway.app/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user?.id,
          }),
        },
      );
      const data = await response.json();
      if (data.message == "User logged out") {
        setUser(null);
        setAccessToken(null);
        await SecureStore.deleteItemAsync("user");
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        setNewUser(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const refreshAccessToken = async () => {
    //refresh the accessToken using the refreshToken
    try {
      setLoading(true);
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const response = await fetch(
        `https://galore-cocktails-more-production.up.railway.app/refresh_token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
            refreshToken,
          }),
        },
      );
      const data = await response.json();
      if (data.accessToken) {
        await SecureStore.setItemAsync(
          "accessToken",
          JSON.stringify(data.accessToken),
        );
        setAccessToken(data.accessToken);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateUserData = async (updatedUser: User) => {
    setLoading(true);
    try {
      await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
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
    console.log(error);
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
        logout,
        register,
        setNewUser,
        setLoading,
        updateUserData,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
