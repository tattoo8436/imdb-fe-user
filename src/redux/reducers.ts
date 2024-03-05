import { createSlice } from "@reduxjs/toolkit";

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    value: 0,
  },
  reducers: {
    add: (state, action) => {
      state.value += action.payload;
    },
    remove: (state, action) => {
      state.value -= action.payload;
    },
  },
});
