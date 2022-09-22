import { useReducer, useEffect } from 'react';
import FavoritesContext from './FavoritesContext';

const defaultFavoritesState = {
    recipes: [],
    totalCount: 0,
};

const favoritesReducer = (state, action) => {
    if (action.type === 'ADD') {

        const existingFavRecipeIndex = state.recipes.findIndex(recipe => recipe.id === action.recipe.id);
        const existingFavRecipe = state.recipes[existingFavRecipeIndex];
        let favRecipes = state.recipes.filter(recipe => recipe.id !== action.recipe.id);

        if (!existingFavRecipe) {
            
        let updatedRecipes = state.recipes.concat(action.recipe);
        // let updatedTotalCount = state.recipes?.length + 1;
        let updatedTotalCount = (state.totalCount + 1);
            return {
                recipes: updatedRecipes,
                totalCount: updatedTotalCount
            };
        }

        //firebase add to users logic 

    }

    if (action.type === 'REMOVE') {
        const existingFavRecipeIndex = state.recipes.findIndex(
            (recipe) => recipe.id === action.id
        );

        let existingRecipe = state.recipes[existingFavRecipeIndex];

       // const updatedTotalCount = state.totalCount - existingRecipe.totalCount;
        const updatedTotalCount = state.totalCount > 0 ? --state.totalCount : 0;

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
    console.log(defaultFavoritesState.totalCount);
    return defaultFavoritesState;
};

const FavoritesProvider = props => {
    const [favoritesState, dispatchFavoritesAction] = useReducer(favoritesReducer, defaultFavoritesState);

    // useEffect(() => {
    //     localStorage.setItem('favorites', JSON.stringify(favoritesState))
    // }, [favoritesState]);


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