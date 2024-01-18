import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  issues: [],
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchIssuesSuccess: (state, action) => {
      state.issues = action.payload;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  fetchIssuesSuccess,
  fetchUsersSuccess,
} = userSlice.actions;

export default userSlice.reducer;