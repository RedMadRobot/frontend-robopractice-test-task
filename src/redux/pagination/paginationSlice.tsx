import { createSlice } from "@reduxjs/toolkit";
import { initialTypePagination } from "../types";

const initialState: initialTypePagination = {
  lastPage: 0,
  firstItem: 0,
  lastItem: 10,
  stepPage: 10,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setRowsPerPage: (state, action) => {
      state.stepPage = action.payload;
      state.firstItem = 0;
      state.lastItem = state.stepPage;
    },
    onClickNextPage: (state) => {
      state.firstItem = state.firstItem + state.stepPage;
      state.lastItem = state.firstItem + state.stepPage;
    },
    onClickPrevPage: (state) => {
      state.firstItem = state.firstItem - state.stepPage;
      state.lastItem = state.lastItem - state.stepPage;
    },
  },
});

export const {
  setRowsPerPage,
  onClickNextPage,
  onClickPrevPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
