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
        // const existingFavRecipe = state.recipes[existingFavRecipeIndex];

        if (existingFavRecipeIndex === -1) {
            let updatedRecipes = state.recipes.concat(action.recipe);

            return {
                recipes: updatedRecipes,
            };
        }

        return state;
    } else if (action.type === ACTIONS.REMOVE) {
        let updatedRecipes = state.recipes.filter(recipe => recipe.id !== action.id);

        // return {
        //     recipes: updatedRecipes
        // }
        return {
            recipes: updatedRecipes
        };
    } else if (action.type === ACTIONS.INIT) {
        return {
            recipes: action.recipes
        }
    } else {
        throw new Error('Reducera sguna banicata, bruH');
    }

    // TODO: delete
    // if (action.type === ACTIONS.INIT) {
    //     const auth = getAuth();

    //     if (!!auth) {
    //         const testAsyncrhonousShenanigans = async () => {
    //             const userRef = doc(db, 'users', auth.currentUser.uid);
    //             const docSnap = await getDoc(userRef);

    //             if (docSnap?.exists()) {
    //                 let userFavs = docSnap?.data()?.favorites;

    //                 updatedRecipes = !!userFavs ? userFavs : [];
    //             }

    //             return updatedRecipes;
    //         };

    //         let updatedRecipes = testAsyncrhonousShenanigans();

    //         console.log('updatedRecipes:');
    //         console.dir(updatedRecipes);


    //         return {
    //             recipes: updatedRecipes
    //         }
    //     } else {
    //         return {
    //             recipes: state.recipes
    //         }
    //     }

    // }

    // return defaultFavoritesState;
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