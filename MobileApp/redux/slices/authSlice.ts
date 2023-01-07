import { createSlice } from "@reduxjs/toolkit";

const auhtSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    setCredentials(state, action) {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = auhtSlice.actions;
export default auhtSlice.reducer;
export const selectCurrentUser = (state: { auth: { user: any } }) =>
  state.auth.user;

export const selectAccessToken = (state: { auth: { accessToken: any } }) =>
  state.auth.accessToken;

export const selectRefreshToken = (state: { auth: { refreshToken: any } }) =>
  state.auth.refreshToken;
