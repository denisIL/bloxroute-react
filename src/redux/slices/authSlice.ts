import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "pilot",
  initialState: {
    authToken: "",
    email: "",
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    clear: (state) => {
      state.authToken = "";
      state.email = "";
    },
  },
});

export const { setAuthToken, setEmail, clear } = authSlice.actions;

export default authSlice.reducer;
