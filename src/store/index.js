import { combineReducers } from '@reduxjs/toolkit';

import usersReducer from './usersSlice';

export default combineReducers({
  users: usersReducer,
});