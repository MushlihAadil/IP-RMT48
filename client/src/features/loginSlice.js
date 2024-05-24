import { createSlice } from "@reduxjs/toolkit";
import { ServerAPI } from "../utils/ServerAPI";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {
      email: "",
      password: "",
    },
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
  },
});

export const { setUser } = loginSlice.actions;

export const loginUser = (user) => {
  return async () => {
    await ServerAPI({
      method: "POST",
      url: `/login`,
      data: user,
    });
  };
};

export default loginSlice.reducer;
