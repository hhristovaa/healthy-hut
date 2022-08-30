import { useReducer } from 'react';
import FavoritesContext from './FavoritesContext';

const defaultFavoritesState = {
    recipes: [],
};

const favoritesReducer = (state, action) => {
    if(action.type === 'ADD') {
      
        const existingFavRecipeIndex = state.recipes.findIndex(recipe => recipe.id === action.recipe.id);
        const existingFavRecipe = state.items[existingFavRecipeIndex];
        let updatedRecipes;

        if (existingFavRecipe) {
            const updatedItem = {
                ...existingFavRecipe
            };
            updatedRecipes = [...state.items];
            updatedRecipes = [existingFavRecipeIndex] = updatedItem;
        } else {
            //if added for the first time 
            updatedRecipes = state.items.concat(action.item);
        }

        return {
            recipes: updatedRecipes,
        };
    }

    if (action.type === 'REMOVE') {
        const existingFavRecipeIndex = state.recipes.findIndex(
            (recipe) => recipe.id === action.id
        );

        const existingRecipe = state.items[existingFavRecipeIndex];
    
        let updatedRecipes;
        
            const updatedItem = { ...existingRecipe};
            updatedRecipes = [...state.items];
            updatedRecipes[existingFavRecipeIndex] = updatedItem;
        
        return {
            recipes: updatedRecipes,

        
        }        
    }
    return defaultFavoritesState;
};

const FavoritesProvider = props => {
    const [favoritesState, dispatchFavoritesAction] = useReducer(favoritesReducer, defaultFavoritesState);

    const addRecipeHandler = recipe => {
        dispatchFavoritesAction({type: 'ADD', recipe: recipe});
    };

    const removeRecipeHandler = id => {
        dispatchFavoritesAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        recipes: favoritesState.items,
        addRecipe: addRecipeHandler,
        removeRecipe: removeRecipeHandler
    };

    return (
        <FavoritesContext.Provider value={cartContext}>
            {props.children}
        </FavoritesContext.Provider>
    )
};

export default FavoritesProvider;