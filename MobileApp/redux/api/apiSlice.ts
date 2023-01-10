import { Flavour } from "./../../constants/globalTypes";
import { selectUser } from "./../slices/userSlice";
import type { RootState } from "../store/store";
import * as SecureStore from "expo-secure-store";
import { selectRefreshToken } from "./../slices/authSlice";
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout, selectAccessToken } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.100.20:4000/",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWrapper = async (
  args: FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);
  const getState = api.getState as () => RootState;
  if (result.error?.originalStatus === 403 || result.error?.status === 403) {
    console.log("sending refresh token request");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    const refreshTokenResponse = await baseQuery(
      {
        url: "/refresh_token",
        method: "POST",
        body: {
          id: getState().user.currentUser?.id,
          refreshToken: refreshToken,
        },
      },
      api,
      extraOptions,
    );
    console.log(refreshTokenResponse);
    if (refreshTokenResponse.data) {
      const user = selectUser(getState());
      api.dispatch(
        setCredentials({
          ...refreshTokenResponse.data,
        }),
      );

      //retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWrapper,
  endpoints: (builder) => ({
    getFlavours: builder.query<Flavour[], void>({
      query: () => ({
        url: "/flavours",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFlavoursQuery } = apiSlice;
