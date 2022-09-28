import { combineReducers } from '@reduxjs/toolkit';

import usersReducer from './usersSlice.js';
import uiReducer from './uiSlice.js';

export default combineReducers({
  users: usersReducer,
  ui: uiReducer,
});