import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

/* eslint  no-param-reassign: 0 */
const daysAdapter = createEntityAdapter();

const initialState = daysAdapter.getInitialState();
const daysSlice = createSlice({
  name: 'days',
  initialState,
  reducers: {
    addDays: (state, { payload }) => {
      daysAdapter.addMany(state, payload);
    },
  },
});

export const usersSelector = daysAdapter.getSelectors((state) => state.users);

export const {
  addUsers,
} = daysSlice.actions;

export default daysSlice.reducer;
