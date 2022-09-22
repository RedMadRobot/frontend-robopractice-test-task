import { RootState } from "../store";

export const selectUsers = (state: RootState) => state.users;
export const selectLength = (state: RootState) => state.users.itemsLength;
export const selectSearch = (state: RootState) => state.users.search;
export const selectLoading = (state: RootState) => state.users.loading;
