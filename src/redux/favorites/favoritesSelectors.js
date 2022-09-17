import { createSelector } from "@reduxjs/toolkit";

const selectFavorites = (state) => state.favorites;

export const selectIsFavorite = createSelector(
	[selectFavorites],
	(favorites) => favorites.isFavorite
);

export const selectFavoritesIsLoading = createSelector(
	[selectFavorites],
	(favorites) => favorites.isLoading
);

export const selectFavoritesError = createSelector(
	[selectFavorites],
	(favorites) => favorites.error
);

export const selectFavoritesList = createSelector(
    [selectFavorites],
    (favorites) => favorites.favoritesList
);