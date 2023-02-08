import axiosInstance from "../lib/axios-interceptor";

interface newCocktail {
  name: string;
  timeToMake: string;
  ingredients: {
    id: number;
    name: string;
  }[];
  instructions: {
    id: number;
    text: string;
  }[];
  image: FileList;
  flavourIds: number[];
  categoryIds: number[];
}

export const createCocktail = async (cocktail: newCocktail) => {
  const formData = new FormData();
  formData.append("name", cocktail.name);
  formData.append("timeToMake", cocktail.timeToMake);
  formData.append("ingredients", JSON.stringify(cocktail.ingredients));
  formData.append("instructions", JSON.stringify(cocktail.instructions));
  formData.append("cocktailImage", cocktail.image[0]);
  formData.append("flavourIds", JSON.stringify(cocktail.flavourIds.join(",")));
  formData.append(
    "categoryIds",
    JSON.stringify(cocktail.categoryIds.join(",")),
  );
  const response = await axiosInstance.post("/cocktails/cocktail", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const deleteCocktail = async (id: number) => {
  const response = await axiosInstance.delete("/cocktails/cocktail/" + id);
  return response;
};

export const deleteCocktails = async (ids: number[]) => {
  const response = await axiosInstance.delete("/cocktails", {
    data: { ids },
  });
  return response;
};
