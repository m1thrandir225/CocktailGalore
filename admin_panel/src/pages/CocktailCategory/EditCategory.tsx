import React from "react";
import Loader from "../../components/Reusable/Loader";
import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryValidation,
  categorySchema,
} from "../../validation/categoryValidation";
import axiosInstance from "../../lib/axios-interceptor";
import { updateFlavour } from "../../api/flavours";
import { updateCocktailCategory } from "../../api/cocktailCategories";
function EditCategory() {
  const { id } = useParams();
  const { data, mutate } = useSWR(`/categories/category/${id}`);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitSuccessful },
  } = useForm<CategoryValidation>({
    defaultValues: {
      name: data?.flavour?.name,
    },
    resolver: zodResolver(categorySchema),
  });
  const onSubmit: SubmitHandler<CategoryValidation> = async (data) => {
    const response = await updateCocktailCategory(
      parseInt(id as string, 10),
      data.name,
    );
    if (response.status === 200) {
      setTimeout(() => {
        mutate(`/categories/category/${id}`);
        navigate("/categories");
      }, 2000);
    } else {
      setError("name", {
        type: "manual",
        message: "Something went wrong",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-start gap-8 w-1/2 place-self-center">
      <h1 className="text-2xl text-gray-800 dark:text-gray-200 font-bold font-sans">
        Edit Flavour
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col justify-center items-start shadow-lg p-8 rounded-md w-full gap-4 dark:bg-gray-700 hover:ring-2 transition-all ease-in-out duration-300 ${
          isSubmitSuccessful ? "ring-2 ring-green-400" : "ring-neutral-300"
        }`}
      >
        <label
          htmlFor="name"
          className="text-2xl text-gray-800 dark:text-gray-200 font-bold"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          defaultValue={data?.flavour?.name}
          placeholder="Enter the name"
          {...register("name")}
          className="p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200"
        />
        <button
          type="submit"
          className="ring-2 ring-amber-400  hover:bg-amber-400  transition-all ease-in-out duration-200 rounded-md px-4 py-2 text-xl font-mediu font-sans text-gray-800 dark:text-gray-200 dark:hover:text-gray-800 font-bold shadow-md place-self-center"
        >
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditCategory;
