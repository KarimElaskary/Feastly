// src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await axios.post("https://e-commerce9.runasp.net/api/Accounts/login", userData);
    return response.data; // must return token or something like { token }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(
      "https://e-commerce9.runasp.net/api/Accounts/register",
      userData
    );
    return response.data; // success message or token depending on backend
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});


const initialState = {
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token; // ✅ ensure you access correct field
        localStorage.setItem("token", action.payload.token); // ✅ save instantly
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
