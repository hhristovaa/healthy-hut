import React from "react";

const FavoritesContext = React.createContext({
    recipes: [],
    totalCount: 0,
    addRecipe: (recipe) => {},
    removeRecipe: (id) => {}
});

export default FavoritesContext;