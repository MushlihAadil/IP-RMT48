import { createSlice } from "@reduxjs/toolkit";
import { ServerAPI } from "../utils/ServerAPI";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    value: 0,
    books: [],
    favourites: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    fetchSuccess: (state, action) => {
      state.books = action.payload;
    }
  },
});

export const { increment, decrement, incrementByAmount, fetchSuccess } =
  bookSlice.actions;

// fetch books HomePage

export function fetchBooks() {
  return async (dispatch, getState) => {
    try {
      const { data } = await ServerAPI({
        method: "GET",
        url: "/books",
      });
      dispatch(fetchSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export default bookSlice.reducer;
