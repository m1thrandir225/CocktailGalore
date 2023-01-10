import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../constants/globalTypes";
interface initialState {
  currentUser: User | null;
}

const initialState: initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { user } = action.payload;
      if (user) {
        state.currentUser = user;
      }
    },
    logoutUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: { user: { currentUser: User | null } }) =>
  state.user.currentUser;

export const selectUserId = (state: { user: { currentUser: User | null } }) =>
  state.user.currentUser?.id;
