import axiosInstance from "../lib/axios-interceptor";

export const getFlavours = async () => {
  const response = await axiosInstance.get("/flavour");
  return response;
};

export const getFlavour = async (id: number) => {
  const response = await axiosInstance.get(`/flavour/${id}`);
  return response;
};

export const createFlavour = async (name: string) => {
  const response = await axiosInstance.post("/flavour", { name });
  return response;
};

export const updateFlavour = async (id: number, name: string) => {
  const response = await axiosInstance.put(`/flavour/${id}`, { name });
  return response;
};

export const deleteFlavour = async (id: number) => {
  const response = await axiosInstance.delete(`/flavour/${id}`);
  return response;
};
