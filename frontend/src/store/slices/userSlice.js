import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserThunk = createAsyncThunk("user/fetch", async () => {
  const res = await axios.get(
    "https://todo-mern-backend-vliz.onrender.com/api/users",
    { withCredentials: true }
  );
  return res.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.username = action.payload.name;
      state.email = action.payload.email;
    });
  },
});

export default userSlice.reducer;
