import { createSlice } from "@reduxjs/toolkit";
import { addFavorite, removeFavorite, checkFavorite, fetchFavorites } from "./favoritesThunks";

const initialState = {
    isFavorite: false,
    favoritesList: [],
    isLoading: false,
    error: null
};

const favoritesSlice = createSlice({
    name: "bookmarks",
    initialState,
    extraReducers: {
        [addFavorite.pending]: (state) => {
            state.isLoading = true;
        },
        [addFavorite.fulfilled]: (state) => {
            state.isLoading = false;
            state.isFavorite = true;
            state.error = null;
        },
        [addFavorite.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [removeFavorite.pending]: (state) => {
            state.isLoading = true;
        },
        [removeFavorite.fulfilled]: (state) => {
            state.isLoading = false;
            state.isFavorite = false;
        },
        [removeFavorite.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [checkFavorite.pending]: (state) => {
            state.isLoading = true;
        },
        [checkFavorite.fulfilled]: (state, { payload }) => {
            state.isFavorite = payload;
            state.isLoading = false;
        },
        [checkFavorite.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        [fetchFavorites.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchFavorites.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.error = null;
            state.favoritesList = payload;
        },
        [fetchFavorites.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
            state.favoritesList = [];
        }
    }
});

const { reducer } = favoritesSlice;

export default reducer;