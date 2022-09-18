import { combineReducers } from '@reduxjs/toolkit';

import usersReducer from './usersSlice.js';
import daysReducer from './daysSlice.js';

export default combineReducers({
  users: usersReducer,
  days: daysReducer,
});