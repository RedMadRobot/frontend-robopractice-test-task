import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// get users data
export const getUsersData = createAsyncThunk("users/getUsersData", async () => {
  const { data } = await axios.get("http://localhost:8080/api/users");

  return data;
});
