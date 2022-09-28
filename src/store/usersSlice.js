import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

/* eslint  no-param-reassign: 0 */
const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      usersAdapter.addMany(state, payload);
    },
  },
});

export const usersSelector = usersAdapter.getSelectors((state) => state.users);

export const {
  addUsers, 
} = usersSlice.actions;

export default usersSlice.reducer;
