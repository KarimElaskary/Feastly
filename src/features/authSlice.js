import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Configuration
const BASE_URL = "https://e-commerce9.runasp.net/api/Accounts";

// Initial State
const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  justLoggedIn: false,
};

// Async Thunks
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, userInfo);
      console.log("Register response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Synchronous actions
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.justLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    // Reset justLoggedIn flag after navigation
    resetJustLoggedIn: (state) => {
      state.justLoggedIn = false;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.justLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login fulfilled, payload:", action.payload);
        state.isLoading = false;
        // Token is inside action.payload.data
        state.user = action.payload.data?.user || null;
        state.token = action.payload.data?.token;
        state.justLoggedIn = true;
        state.error = null;
        localStorage.setItem("token", action.payload.data?.token);
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login rejected:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.justLoggedIn = false;
      })

      // Registration cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.justLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Register fulfilled, payload:", action.payload);
        state.isLoading = false;
        // Check both flat and nested 'data' property structures to be safe
        state.user = action.payload.user || action.payload.data?.user || null;
        state.token = action.payload.token || action.payload.data?.token;
        state.justLoggedIn = true;
        state.error = null;
        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Register rejected:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
        state.justLoggedIn = false;
      });
  },
});

// Exports
export const { logout, resetJustLoggedIn, clearError } = authSlice.actions;
export default authSlice.reducer;