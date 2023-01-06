import type { RootState } from "../store/store";
import { selectCurrentUser, selectRefreshToken } from "./../slices/authSlice";
import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout, selectAccessToken } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
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
  if (result.error?.status === 403) {
    console.log("sending refresh token request");
    const refreshToken = await baseQuery("/refresh_token", api, {
      method: "POST",
      body: JSON.stringify({
        email: selectCurrentUser(getState())?.email,
        refreshToken: selectRefreshToken(getState()),
      }),
    });
    if (refreshToken.data) {
      const user = selectCurrentUser(getState());
      api.dispatch(setCredentials({ ...refreshToken.data, user }));

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
  endpoints: (builder) => ({}),
});
