import axiosInstance from "../lib/axios-interceptor";

export const loginApi = async (email: string, password: string) => {
  const response = await axiosInstance.post("/login", {
    email: email,
    password: password,
  });
  return response.data;
};

export const logoutApi = async (id: number) => {
  const response = await axiosInstance.post("/logout", {
    id: id,
  });
  return response.data;
};
