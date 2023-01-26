import axiosInstance from "../lib/axios-interceptor";

export const getFlavours = async () => {
  const response = await axiosInstance.get("/flavours/");
  return response;
};

export const getFlavour = async (id: number) => {
  const response = await axiosInstance.get(`/flavour/${id}`);
  return response;
};

export const createFlavour = async (name: string) => {
  const response = await axiosInstance.post("/flavours/flavour", { name });
  return response;
};

export const updateFlavour = async (id: number, name: string) => {
  const response = await axiosInstance.put(`/flavours/flavour/${id}`, {
    name: name,
  });
  return response;
};

export const deleteFlavour = async (ids: number[]) => {
  const response = await axiosInstance.delete(`/flavours/flavour`, {
    data: { ids: ids },
  });
  return response;
};
