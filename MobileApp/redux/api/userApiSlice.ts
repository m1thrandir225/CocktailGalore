import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/user/${data.id}`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApiSlice;
