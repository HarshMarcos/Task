import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import repoNameReducer from "./repoNameSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    repoName: repoNameReducer,
  },
});

export default store;
