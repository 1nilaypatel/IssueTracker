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
    deleteIssuesSuccess: (state, action) => {
      state.issues = state.issues.filter((issue) => issue._id !== action.payload);
    },
    updateIssuesSuccess: (state, action) => {
      const updatedIssue = action.payload;
      state.issues = state.issues.map((issue) =>
        issue._id === updatedIssue._id ? updatedIssue : issue
      );
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  fetchIssuesSuccess,
  fetchUsersSuccess,
  deleteIssuesSuccess,
  updateIssuesSuccess,
} = userSlice.actions;

export default userSlice.reducer;