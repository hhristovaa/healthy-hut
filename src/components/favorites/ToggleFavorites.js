import { useState, useContext, useEffect } from 'react';
import Spinner from '../UI/Spinner';
import classes from './ToggleFavorites.module.scss';
import { IonIcon } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import FavoritesContext from '../../context/FavoritesContext';
import { getAuth } from 'firebase/auth';
import { updateDoc, doc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const ToggleFavorites = (props) => {
    const { loggedIn, loadingStatus } = useAuthStatus();
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [favRecipeData, setFavRecipeData] = useState({
        favorites: []
    });

    const favoritesCtx = useContext(FavoritesContext);
    const { recipes } = favoritesCtx;

    const auth = getAuth();

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({ ...recipe });
    };

    const removeFromFavorites = id => {
        favoritesCtx.removeRecipe(id);
    };

    const toggleFavorite = (e) => {
        e.preventDefault();

        if (!loggedIn) {
            toast.error('This feature is only for logged in users.');
            return;
        };

        if (favorite) {
            onDelete(props.recipe.id);
            removeFromFavorites(props.recipe.id)
        } else {
            addToFavorites(props.recipe);
            onSubmit(e);

        }
        setFavorite(!favorite);
    }


    useEffect(() => {
        const newFavoriteRecipe = recipes.some(recipe => recipe.id === props?.recipe?.id);

        setFavorite(newFavoriteRecipe);
        setFavRecipeData({
            ...props.recipe

        });

    }, [favorite, recipes, props]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const docRef = doc(db, 'users', auth.currentUser.uid)

        setFavRecipeData({
            favRecipeData
        });

        updateDoc(docRef,
            {
                favorites: arrayUnion(favRecipeData)
            },
            {
                merge: true
            }).then(docRef => {
                toast.success('The recipe was successfully marked as favorite!');
            }).catch(err => {
                toast.error('Unable to mark the recipe as favorite!');
            });

        setLoading(false);
    }

    const onDelete = async (recipeId) => {
        if (window.confirm('Are you sure you want to remove this recipe from favorites?')) {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid)
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    let userFavs = docSnap?.data()?.favorites;
                    const unfavedRecipe = userFavs.filter((recipe) => recipe.id === recipeId);
                    updateDoc(userRef, {
                        favorites: arrayRemove(...unfavedRecipe)
                    });
                }
                toast.success('Successfully deleted from favorites.');

            } catch (err) {
                toast.error('An error occurred while removing from favorites.');

            }
        }
    }

    return (
        <>
            {loading && <Spinner />}
            <span
                className={classes['recipe__favorites']}
                onClick={toggleFavorite}>
                <IonIcon icon={favorite ? heart : heartOutline} size='large' />
                {favorite ? 'Remove From Favorites' : 'Add To Favorites'}
            </span>
        </>
    )
}

export default ToggleFavorites;