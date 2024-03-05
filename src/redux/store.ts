import { configureStore } from "@reduxjs/toolkit";
import { calculatorSlice } from "./reducers";

const store = configureStore({
  reducer: {
    calculator: calculatorSlice.reducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export default store;
