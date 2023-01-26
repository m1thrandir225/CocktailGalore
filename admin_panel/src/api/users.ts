import axiosInstance from "../lib/axios-interceptor";
import { UserValidation } from "../validation/userValidation";

export const createUser = async (user: UserValidation) => {
  const response = await axiosInstance.post("/users/user", {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  return response;
};

export const deleteUsers = async (ids: number[]) => {
  const response = await axiosInstance.delete("/users", {
    data: {
      ids: ids,
    },
  });
  return response;
};

export const updateUser = async (id: number, user: UserValidation) => {
  const response = await axiosInstance.post(`/users/user/${id}`, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  return response;
};
