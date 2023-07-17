import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    // eslint-disable-next-line no-unused-vars
    clearUser: (state) => {
      return null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.user };
    },
  },
});

export const { setUser, updateUser, clearUser, setToken, fetchUser } =
  userSlice.actions;
export default userSlice.reducer;
