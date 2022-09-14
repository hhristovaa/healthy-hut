import { useReducer, useEffect } from 'react';
import FavoritesContext from './FavoritesContext';

const defaultFavoritesState = {
    recipes: [],
    totalCount: 0
};

const favoritesReducer = (state, action) => {
    if (action.type === 'ADD') {


        const existingFavRecipeIndex = state.recipes.findIndex(recipe => recipe.id === action.recipe.id);
        debugger;
        const existingFavRecipe = state.recipes[existingFavRecipeIndex];

        if (!existingFavRecipe) {
            
        let updatedRecipes = state.recipes.concat(action.recipe);
        let updatedTotalCount = state.recipes?.length + 1;
            return {
                recipes: updatedRecipes,
                totalCount: updatedTotalCount
            };
          
        }

    }

    if (action.type === 'REMOVE') {
        const existingFavRecipeIndex = state.recipes.findIndex(
            (recipe) => recipe.id === action.id
        );

        let existingRecipe = state.recipes[existingFavRecipeIndex];

       // const updatedTotalCount = state.totalCount - existingRecipe.totalCount;
        const updatedTotalCount = state.totalCount--;

        let updatedRecipes;

        if (existingRecipe) {
            updatedRecipes = state.recipes.filter(recipe => recipe.id !== action.id);
        } else {
     
            updatedRecipes = [...state.recipes];
            updatedRecipes[existingFavRecipeIndex] = existingRecipe;
        } 


        return {
            recipes: updatedRecipes,
            totalCount: updatedTotalCount


        }
    }
    return defaultFavoritesState;
};

const FavoritesProvider = props => {
    const [favoritesState, dispatchFavoritesAction] = useReducer(favoritesReducer, defaultFavoritesState);

    // useEffect(() => {
    //     localStorage.setItem('favorites', JSON.stringify(favoritesState))
    // }, [favoritesState]);
    console.log(favoritesState);
    const addRecipeHandler = recipe => {
        dispatchFavoritesAction({ type: 'ADD', recipe: recipe });
    };

    const removeRecipeHandler = id => {
        dispatchFavoritesAction({ type: 'REMOVE', id: id });
    };

    const favoritesContext = {
        recipes: favoritesState.recipes,
        totalCount: favoritesState.totalCount,
        addRecipe: addRecipeHandler,
        removeRecipe: removeRecipeHandler,

    };

    return (
        <FavoritesContext.Provider value={favoritesContext}>
            {props.children}
        </FavoritesContext.Provider>
    )
};

export default FavoritesProvider;