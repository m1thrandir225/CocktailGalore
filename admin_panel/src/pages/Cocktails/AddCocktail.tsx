import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cocktailSchema,
  CocktailValidation,
} from "../../validation/cocktailValidation";
import ListInput from "../../components/Reusable/ListInput";
import { CocktailCategory, Flavour } from "../../types/apiTypes";
import useSWR from "swr";
import SelectMultiple from "../../components/Reusable/SelectMultiple";
import { createCocktail } from "../../api/cocktails";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Reusable/Loader";
const AddCocktail = () => {
  const [ingredients, setIngredients] = React.useState<string[]>([""]);
  const [instructions, setInstructions] = React.useState<string[]>([""]);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [selectedFlavours, setSelectedFlavours] = React.useState<Flavour[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<
    CocktailCategory[]
  >([]);

  const {
    data: dataFlavours,
    isLoading: LoadingFlavours,
    isValidating: ValidatingFlavours,
  } = useSWR("/flavours", {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const {
    data: dataCategories,
    isLoading: LoadingCategories,
    isValidating: ValidatingCategories,
  } = useSWR("/categories", {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const {
    register,
    formState: { isSubmitSuccessful, errors, isSubmitting },
    handleSubmit,
  } = useForm<CocktailValidation>({
    resolver: zodResolver(cocktailSchema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<CocktailValidation> = async (data) => {
    const flavourIds = selectedFlavours.map((flavour) => flavour.id);
    const categoryIds = selectedCategory.map((category) => category.id);
    const cocktail = {
      ...data,
      flavourIds,
      categoryIds,
    };
    const response = await createCocktail(cocktail);
    if (response.status === 200) {
      navigate("/cocktails");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-3 w-full  gap-4"
    >
      {isSubmitting && <Loader loading={isSubmitting} />}
      <div className="flex flex-col gap-4 w-full dark:bg-gray-700 p-2 h-full rounded-md shadow-md">
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label className="text-lg w-full text-gray-800 dark:text-gray-200 font-medium font-sans">
            Name
          </label>
          <input
            {...register("name")}
            className={`p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200 ${
              errors.name && "ring-2 ring-red-500"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label className="text-lg w-full text-gray-800 dark:text-gray-200 font-medium font-sans">
            Time To Make
          </label>
          <input
            {...register("timeToMake")}
            type="number"
            className={`p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200 ${
              errors.timeToMake && "ring-2 ring-red-500"
            }`}
          />
          {errors.timeToMake && (
            <span className="text-red-500 text-sm">
              {errors.timeToMake.message}
            </span>
          )}
        </div>

        <ListInput
          label="Ingredients"
          items={ingredients}
          setItems={setIngredients}
          register={register}
          registerName="ingredients"
          errors={errors.ingredients}
        />
        {errors.ingredients && (
          <span className="text-red-500 text-sm">
            {errors.ingredients.message}
          </span>
        )}
        <ListInput
          label="Instructions"
          items={instructions}
          setItems={setInstructions}
          register={register}
          registerName="instructions"
          errors={errors.instructions}
        />
        {errors.instructions && (
          <span className="text-red-500 text-sm">
            {errors.instructions.message}
          </span>
        )}
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <label
            htmlFor="image"
            className="text-lg w-full text-gray-800 dark:text-gray-200 font-medium font-sans"
          >
            Image
          </label>
          <img
            src={"/placeholder-image.png"}
            alt="preview"
            className="w-full h-40 object-contain bg-gray-200 dark:bg-gray-800 border-2 border-gray-50 rounded-md"
          />
          <label className="block w-full">
            <span className="sr-only">Choose File</span>
            <input
              {...register("image")}
              type="file"
              className="block  text-sm text-gray-500  file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 max-w-xs file:text-gray-800 hover:file:bg-amber-100"
            />
          </label>
        </div>
      </div>
      <SelectMultiple
        label="Flavours"
        options={dataFlavours?.flavours}
        selectedOptions={selectedFlavours}
        setOptions={setSelectedFlavours}
        loading={LoadingFlavours || ValidatingFlavours}
      />
      <SelectMultiple
        label="Categories"
        options={dataCategories?.categories}
        selectedOptions={selectedCategory}
        setOptions={setSelectedCategory}
        loading={LoadingCategories || ValidatingCategories}
      />
      <button
        type="submit"
        className="fixed right-4 bottom-4"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </form>
  );
};

export default AddCocktail;
