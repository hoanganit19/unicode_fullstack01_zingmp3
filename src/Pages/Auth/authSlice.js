import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  userLogin: {
    isLoading: true,
    isAuthenticated: false,
    user: {},
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;

export const authSelector = (state) => state.auth;
