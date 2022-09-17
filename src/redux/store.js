import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./favorites/favoritesSlice";

const store = configureStore({
	reducer: {
		favorites: favoritesSlice,		
	}
});

export default store;
