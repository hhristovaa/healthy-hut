import React from "react";

const FavoritesContext = React.createContext({
    recipes: [],
    addRecipe: (recipe) => { },
    removeRecipe: (id) => { },
    initRecipe: (recipes) => { }
});

export default FavoritesContext;