import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users
export const getOneUser = createAsyncThunk(
  "users/getOneUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      console.log("hello api");
      console.log(response, "p[p[p[p[[p[[");
      return response?.data; // This will be your payload
    } catch (error) {
      console.log("error api call");
      return rejectWithValue(error.response?.data || "Error fetching users");
    }
  }
);

const userSlice = createSlice({
  name: "userData",
  initialState: {
    userDetails: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
