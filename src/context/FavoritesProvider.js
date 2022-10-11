import { useReducer } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import FavoritesContext from './FavoritesContext';
import { ACTIONS } from '../utils/constants';
import { useAuthStatus } from '../hooks/useAuthStatus';

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
        }
        return {
            recipes: updatedRecipes
        }
    }

    if (action.type === ACTIONS.INIT) {

        console.log('Ура!');

        const auth = getAuth();
        console.log(auth);
        let resultToReturn;

        if (!!auth) {
            const fetchUserFavorites = async () => {
                console.log('eho')
                const userRef = doc(db, 'users', auth.currentUser.uid)
                const docSnap = await getDoc(userRef);

                if (docSnap?.exists()) {
                    let userFavs = docSnap?.data()?.favorites;

                    resultToReturn = !!userFavs ? userFavs : [];
                }
            }

            fetchUserFavorites();

            return {
                recipes: resultToReturn
            }
        }
        console.log(resultToReturn)

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

    const initRecipeHandler = recipes => {
        dispatchFavoritesAction({ type: ACTIONS.INIT, recipes: recipes });
    };

    const favoritesContext = {
        recipes: favoritesState.recipes,
        addRecipe: addRecipeHandler,
        removeRecipe: removeRecipeHandler,
        initRecipe: initRecipeHandler
    };



    return (
        <FavoritesContext.Provider value={favoritesContext}>
            {props.children}
        </FavoritesContext.Provider>
    )
};

export default FavoritesProvider;