import { createSlice } from "@reduxjs/toolkit";
import { getUsersData } from "./asyncAction";
import { initialTypeUsers } from "../types";

const initialState: initialTypeUsers = {
  items: [],
  loading: true,
  search: "",
  itemsLength: 0,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersData.pending, (state) => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(getUsersData.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.itemsLength = state.items.length;
    });
    builder.addCase(getUsersData.rejected, (state) => {
      state.loading = true;
      state.items = [];
    });
  },
});

export const { setSearch } = usersSlice.actions;

export default usersSlice.reducer;
