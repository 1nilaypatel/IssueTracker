import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  issues: [],
  filteredIssues: [],
  users: [],
  notifiedUser: null,
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
    fetchNotifiedUser: (state, action) => {
      state.notifiedUser = action.payload;
    }
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
  updateFilteredIssues,
  fetchNotifiedUser,
} = userSlice.actions;

export default userSlice.reducer;