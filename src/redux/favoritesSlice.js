// src/redux/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const repoId = action.payload;
      if (state.favorites.includes(repoId)) {
        state.favorites = state.favorites.filter((id) => id !== repoId);
      } else {
        state.favorites.push(repoId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
