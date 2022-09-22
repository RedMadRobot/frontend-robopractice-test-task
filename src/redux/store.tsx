import { configureStore } from "@reduxjs/toolkit";
import usersReduser from "./users/usersSlice";
import paginationReducer from "./pagination/paginationSlice";

export const store = configureStore({
  reducer: {
    users: usersReduser,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
