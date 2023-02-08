import { useForm, SubmitHandler } from "react-hook-form";
import {
  categorySchema,
  CategoryValidation,
} from "../../validation/categoryValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCocktailCategory } from "../../api/cocktailCategories";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/Reusable/PageTitle";
function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm<CategoryValidation>({
    resolver: zodResolver(categorySchema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<CategoryValidation> = async (data) => {
    const response = await createCocktailCategory(data.name);
    if (response.status === 200) {
      navigate("/categories");
    } else {
      setError("name", {
        type: "manual",
        message: "Something went wrong",
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-start gap-8 w-1/2 place-self-center">
      <PageTitle title="Add a new category" />
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
          placeholder="Enter the name "
          {...register("name")}
          className="p-4 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 w-full outline-none focus:ring-2 focus:ring-amber-400 transition-all ease-in-out duration-200"
        />
        <button
          type="submit"
          className="ring-2 ring-amber-400  hover:bg-amber-400  transition-all ease-in-out duration-200 rounded-md px-4 py-2 text-xl font-mediu font-sans text-gray-800 dark:text-gray-200 dark:hover:text-gray-800 font-bold shadow-md place-self-center"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
