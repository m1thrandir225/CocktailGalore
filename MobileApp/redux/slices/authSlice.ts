import { User } from "./../../constants/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const storeToSecureStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};
const deleteFromSecureStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

interface initialState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  newUser: boolean;
}
const initialState: initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  newUser: true,
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      if (user) {
        storeToSecureStore("user", JSON.stringify(user));
      }
      if (accessToken) {
        storeToSecureStore("accessToken", accessToken);
      }
      if (refreshToken) {
        storeToSecureStore("refreshToken", refreshToken);
      }
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.newUser = true;
      deleteFromSecureStore("user");
      deleteFromSecureStore("accessToken");
      deleteFromSecureStore("refreshToken");
    },
  },
});

export const { setCredentials, logout } = auhtSlice.actions;

export default auhtSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: User | null } }) =>
  state.auth.user;

export const selectAccessToken = (state: {
  auth: { accessToken: string | null };
}) => state.auth.accessToken;

export const selectRefreshToken = (state: {
  auth: { refreshToken: string | null };
}) => state.auth.refreshToken;
