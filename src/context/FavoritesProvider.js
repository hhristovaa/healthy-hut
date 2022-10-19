import { useReducer } from 'react';

import FavoritesContext from './FavoritesContext';
import { ACTIONS } from '../utils/constants';

const defaultFavoritesState = {
    recipes: []
};

const favoritesReducer = (state, action) => {
    if (action.type === ACTIONS.ADD) {
        const existingFavRecipeIndex = state.recipes.findIndex(recipe => recipe.id === action.recipe.id);

        if (existingFavRecipeIndex === -1) {
            let updatedRecipes = state.recipes.concat(action.recipe);

            return {
                recipes: updatedRecipes,
            };
        }

        return state;

    } else if (action.type === ACTIONS.REMOVE) {
        let updatedRecipes = state.recipes.filter(recipe => recipe.id !== action.id);
        return {
            recipes: updatedRecipes
        };

    } else if (action.type === ACTIONS.INIT) {
        return {
            recipes: action.recipes
        }

    } else {
        throw new Error(`An error occured while trying to ${action.type} favorite recipe. `);
    }
};

const FavoritesProvider = props => {
    const [favoritesState, dispatchFavoritesAction] = useReducer(favoritesReducer, defaultFavoritesState);

    const addRecipeHandler = recipe => {
        dispatchFavoritesAction({ type: ACTIONS.ADD, recipe: recipe });
    };

    const removeRecipeHandler = id => {
        dispatchFavoritesAction({ type: ACTIONS.REMOVE, id: id });
    };

    const initRecipeHandler = recipes => {
        dispatchFavoritesAction({ type: ACTIONS.INIT, recipes: recipes });
    };

    const favoritesContext = {
        recipes: favoritesState.recipes,
        addRecipe: addRecipeHandler,
        removeRecipe: removeRecipeHandler,
        initRecipes: initRecipeHandler
    };

    return (
        <FavoritesContext.Provider value={favoritesContext}>
            {props.children}
        </FavoritesContext.Provider>
    )
};

export default FavoritesProvider;