import { apiSlice } from "./apiSlice";
import type { Flavour } from "../../constants/globalTypes";
export const flavourApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFlavours: builder.query<Flavour[], void>({
      query: () => ({
        url: "/flavours/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFlavoursQuery } = flavourApiSlice;
