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
  firstTime: boolean;
}
export const initialState: initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  firstTime: true,
};

const auhtSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken, refreshToken, firstTime } = action.payload;
      if (user) {
        state.user = user;
      }
      if (accessToken) {
        state.accessToken = accessToken;
      }
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }

      if (firstTime) {
        state.firstTime = firstTime;
        console.log(firstTime);
      }
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.firstTime = true;
      async () => {
        await SecureStore.deleteItemAsync("refreshToken");
        await SecureStore.deleteItemAsync("newUser");
      };
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

export const selectFirstTime = (state: { auth: { firstTime: boolean } }) =>
  state.auth.firstTime;
