import { Flavour } from "./../../constants/globalTypes";
import { logoutUser, selectUser } from "./../slices/userSlice";
import type { RootState } from "../store/store";
import * as SecureStore from "expo-secure-store";
import { selectRefreshToken, setAccessToken } from "./../slices/authSlice";
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout, selectAccessToken } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://3431-95-180-229-114.eu.ngrok.io/",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = selectAccessToken(getState() as RootState);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWrapper = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);
  const getState = api.getState as () => RootState;
  if (result.error && result.error.status === 403) {
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
    if (refreshTokenResponse.data) {
      const user = selectUser(getState());
      console.log(refreshTokenResponse.data);
      api.dispatch(setAccessToken({ ...refreshTokenResponse.data }));

      //retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshTokenResponse.error?.data == "invalid token") {
      api.dispatch(logout());
      api.dispatch(logoutUser());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWrapper,
  endpoints: (builder) => ({
    getFlavours: builder.query<{ flavours: Flavour[] }, void>({
      query: () => ({
        url: "/flavours",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFlavoursQuery } = apiSlice;
