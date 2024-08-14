import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repoName: "All Repositories",
};

export const repoNameSlice = createSlice({
  name: "repoName",
  initialState,
  reducers: {
    setRepoName: (state, action) => {
      state.repoName = action.payload;
    },
    clearRepoName: (state) => {
      state.repoName = "All Repositories";
    },
  },
});

export const { setRepoName, clearRepoName } = repoNameSlice.actions;
export default repoNameSlice.reducer;
