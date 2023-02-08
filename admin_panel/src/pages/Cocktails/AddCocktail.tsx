import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
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
import RoundedButtonIcon from "../../components/Reusable/RoundedButtonIcon";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
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
    control,
    reset,
  } = useForm<CocktailValidation>({
    resolver: zodResolver(cocktailSchema),
    defaultValues: {
      ingredients: [{ id: 1, name: "" }],
      instructions: [{ id: 1, text: "" }],
    },
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    append: appendInstructions,
    fields: fieldsInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
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
    } else {
      reset();
      setSelectedCategory([]);
      setSelectedFlavours([]);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-3 w-full gap-4 overflow-y-scroll h-screen pb-4"
    >
      {isSubmitting && <Loader loading={isSubmitting} />}
      <div className="flex flex-col gap-4 w-full dark:bg-gray-700 p-2 h-fit rounded-md shadow-md">
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
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <div className="flex flex-row justify-between items-center w-full">
            <label className="text-lg w-full text-gray-800 dark:text-gray-200 font-medium font-sans">
              Ingredients
            </label>
            <div className="flex flex-row justify-start items-center w-auto gap-2">
              <RoundedButtonIcon
                icon={<AiOutlinePlus />}
                onClick={() => append({ id: fields.length + 1, name: "" })}
              />
              <RoundedButtonIcon
                disabled={fields.length === 1}
                icon={<AiOutlineMinus />}
                onClick={() => remove(fields.length - 1)}
              />
            </div>
          </div>
          {fields.map((field, index) => (
            <div key={index} className="w-full">
              <input
                {...register(`ingredients.${index}.name`)}
                type="text"
                className={`p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200`}
              />
              {errors.ingredients?.[index]?.message && (
                <span className="text-red-500 text-sm">
                  {errors.ingredients?.[index]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-start items-start w-full gap-2">
          <div className="flex flex-row justify-between items-center w-full">
            <label className="text-lg w-full text-gray-800 dark:text-gray-200 font-medium font-sans">
              Instructions
            </label>
            <div className="flex flex-row justify-start items-center w-auto gap-2">
              <RoundedButtonIcon
                icon={<AiOutlinePlus />}
                onClick={() =>
                  appendInstructions({
                    id: fieldsInstructions.length + 1,
                    text: "",
                  })
                }
              />
              <RoundedButtonIcon
                disabled={fieldsInstructions.length === 1}
                icon={<AiOutlineMinus />}
                onClick={() =>
                  removeInstructions(fieldsInstructions.length - 1)
                }
              />
            </div>
          </div>
          {fieldsInstructions.map((field, index) => (
            <div key={index} className="w-full">
              <input
                {...register(`instructions.${index}.text`)}
                type="text"
                className={`p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200`}
              />
              {errors.instructions?.[index]?.message && (
                <span className="text-red-500 text-sm">
                  {errors.instructions?.[index]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
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
        className="fixed right-14 bottom-4 rounded-md bg-amber-400 px-8 py-2 text-gray-800 font-bold hover:bg-amber-500 transition-all ease-in-out duration-200"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </form>
  );
};

export default AddCocktail;
