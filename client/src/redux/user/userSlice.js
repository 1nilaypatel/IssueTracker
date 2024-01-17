import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  issues: [],
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
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  fetchIssuesSuccess,
} = userSlice.actions;

export default userSlice.reducer;