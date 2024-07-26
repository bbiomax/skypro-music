import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: null,
  email: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) {
      state.username = action.payload.username;
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
