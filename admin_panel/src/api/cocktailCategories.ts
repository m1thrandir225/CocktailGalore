import axiosInstance from "../lib/axios-interceptor";

export const getCocktailCategory = async (id: number) => {
  const response = await axiosInstance.get(`/categories/category/${id}`);
  return response;
};

export const createCocktailCategory = async (name: string) => {
  const response = await axiosInstance.post("/categories", {
    name: name,
  });
  return response;
};

export const updateCocktailCategory = async (id: number, name: string) => {
  const response = await axiosInstance.put(`/categories/category/${id}`, {
    name: name,
  });
  return response;
};

export const deleteCocktailCategories = async (ids: number[]) => {
  const response = await axiosInstance.delete(`/categories/category`, {
    data: { ids: ids },
  });
  return response;
};

export const deleteCocktailCategory = async (id: number) => {
  const response = await axiosInstance.delete(`/categories/category/${id}`);
  return response;
};
