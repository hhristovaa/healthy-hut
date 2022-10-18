import React from "react";

const FavoritesContext = React.createContext({
    recipes: [],
    addRecipe: (recipe) => { },
    removeRecipe: (id) => { },
    initRecipes: (recipes) => { }
});

export default FavoritesContext;