import { useReducer } from 'react';
import FavoritesContext from './FavoritesContext';
import { ACTIONS } from '../utils/constants';

const defaultFavoritesState = {
    recipes: []
};

const favoritesReducer = (state, action) => {
    if (action.type === ACTIONS.ADD) {
        const existingFavRecipeIndex = state.recipes.findIndex(recipe => recipe.id === action.recipe.id);
        const existingFavRecipe = state.recipes[existingFavRecipeIndex];

        if (!existingFavRecipe) {
            let updatedRecipes = state.recipes.concat(action.recipe);
            return {
                recipes: updatedRecipes,

            };
        }

    }

    if (action.type === ACTIONS.REMOVE) {
        const existingFavRecipeIndex = state.recipes.findIndex(
            (recipe) => recipe.id === action.id
        );

        let existingRecipe = state.recipes[existingFavRecipeIndex];
        let updatedRecipes;

        if (existingRecipe) {
            updatedRecipes = state.recipes.filter(recipe => recipe.id !== action.id);
        } else {
            updatedRecipes = [...state.recipes];
            updatedRecipes[existingFavRecipeIndex] = existingRecipe;
        }

        return {
            recipes: updatedRecipes
        }
    }

    return defaultFavoritesState;
};

const FavoritesProvider = props => {
    const [favoritesState, dispatchFavoritesAction] = useReducer(favoritesReducer, defaultFavoritesState);

    const addRecipeHandler = recipe => {
        dispatchFavoritesAction({ type: ACTIONS.ADD, recipe: recipe });
    };

    const removeRecipeHandler = id => {
        dispatchFavoritesAction({ type: ACTIONS.REMOVE, id: id });
    };

    const favoritesContext = {
        recipes: favoritesState.recipes,
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