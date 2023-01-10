import { authApiSlice } from "./../api/authApiSlice";
import { apiSlice } from "./../api/apiSlice";
import { User } from "./../../constants/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

interface initialState {
  accessToken: string | null;
  refreshToken: string | null;
}
export const initialState: initialState = {
  accessToken: null,
  refreshToken: null,
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { accessToken, refreshToken } = action.payload;
      if (accessToken) {
        state.accessToken = accessToken;
      }
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
    },
    setAccessToken(state, action) {
      const { accessToken } = action.payload;
      if (accessToken) {
        state.accessToken = accessToken;
      }
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout, setAccessToken } = auhtSlice.actions;

export default auhtSlice.reducer;

export const selectAccessToken = (state: {
  auth: { accessToken: string | null };
}) => state.auth.accessToken;

export const selectRefreshToken = (state: {
  auth: { refreshToken: string | null };
}) => state.auth.refreshToken;
