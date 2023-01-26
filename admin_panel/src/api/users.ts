import axiosInstance from "../lib/axios-interceptor";
import { UserValidation } from "../validation/userValidation";
import type { User } from "../types/apiTypes";

export type UserResponse = {
  data: User[];
};

export const deleteUsers = async (ids: number[]) => {
  const response = await axiosInstance.delete("/users", {
    data: {
      ids: ids,
    },
  });
  return response;
};

export const updateUserData = async (id: number, user: UserValidation) => {
  const response = await axiosInstance.post<UserResponse>(`/users/user/${id}`, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  return response;
};

export const updateUserProfile = async (id: number, image: File) => {
  const formData = new FormData();
  formData.append("profileImage", image);
  formData.append("id", id.toString());
  const response = await axiosInstance.post<UserResponse>(
    `/users/user/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response;
};

export const updateUserPassword = async (
  id: number,
  oldPassword: string,
  newPassword: string,
) => {
  const response = await axiosInstance.post<UserResponse>(`/users/user/${id}`, {
    oldPassword,
    newPassword,
  });
  return response;
};
