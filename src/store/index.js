import { configureStore } from '@reduxjs/toolkit';
import userReduser from './usersSlice.js';

export default configureStore({
  reducer: {
    users: userReduser,
  },
});
