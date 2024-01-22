import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  issues: [],
  filteredIssues: [],
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
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logOutUserStart: (state) => {
      state.loading = true;
    },
    logOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    logOutUserFailure: (state, action) => {
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
      state.filteredIssues = state.filteredIssues.filter((issue) => issue._id != action.payload);
    },
    updateIssuesSuccess: (state, action) => {
      const updatedIssue = action.payload;
      state.issues = state.issues.map((issue) =>
        issue._id === updatedIssue._id ? updatedIssue : issue
      );
      state.filteredIssues = state.filteredIssues.map((issue) => 
        issue._id === updatedIssue._id ? updatedIssue : issue
      );
    },
    updateFilteredIssues: (state, action) => {
      state.filteredIssues = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logOutUserStart,
  logOutUserSuccess,
  logOutUserFailure,
  fetchIssuesSuccess,
  fetchUsersSuccess,
  deleteIssuesSuccess,
  updateIssuesSuccess,
  updateFilteredIssues,
} = userSlice.actions;

export default userSlice.reducer;