import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

/* eslint  no-param-reassign: 0 */
const uiAdapter = createEntityAdapter();

const initialState = uiAdapter.getInitialState({
  maxNumberDays: 0,
  seachUser: '',
  sortColumn: 1,
  sortDirect: 'asc',
  currPage: 1,
  maxPage: 1,
});
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMaxNumberDays: (state, { payload }) => {
      state.maxNumberDays = payload;
    },
    nextPage: (state, { payload }) => {
      state.currPage = state.currPage + 1 <= state.maxPage ? state.currPage + 1 : state.currPage;
    },
    prevPage: (state, { payload }) => {
      state.currPage = state.currPage - 1 >= 0 ? state.currPage - 1 : 0;
    },
    setSort: (state, { payload }) => {
      //const [ columnSort, direction ] = state.sortColumnDirect.split('-');
    },
    setSeachUser: (state, { payload }) => {
      state.seachUser = payload;
    },
  },
});

export const uiSelector = uiAdapter.getSelectors((state) => state.ui);

export const {
  nextPage, prevPage, setSort, setSeachUser, setMaxNumberDays,
} = uiSlice.actions;

export default uiSlice.reducer;
