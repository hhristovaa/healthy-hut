import { useState, useContext, useEffect, useRef } from 'react';
import Spinner from '../UI/Spinner';
import classes from './ToggleFavorites.module.scss';
import { IonIcon } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import FavoritesContext from '../../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { updateDoc, deleteDoc, addDoc, getDocs, doc, query, where, orderBy, collection, serverTimestamp, setDoc, FieldValue, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';


const ToggleFavorites = (props) => {
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [favRecipeData, setFavRecipeData] = useState({
        favorites: []
    });

    const { favorites } = favRecipeData;

    const favoritesCtx = useContext(FavoritesContext);
    const { recipes } = favoritesCtx;

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({ ...recipe });
    };

    const removeFromFavorites = id => {
        favoritesCtx.removeRecipe(id);
    };

    const toggleFavorite = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(props.recipe.id)
            onDelete(props.recipe.id);
        } else {


            onSubmit(e)
            addToFavorites(props.recipe);

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

    if (loading) {
        return <Spinner />
    }




    const onSubmit = async (e) => {
        e.preventDefault();

        const docRef = doc(db, 'users', auth.currentUser.uid)
        console.log(favRecipeData)
        console.log(favorites);

        setFavRecipeData({
            favRecipeData
        });

        console.log(favRecipeData);
        updateDoc(docRef, {
            favorites: arrayUnion(favRecipeData)
        }, { merge: true }).then(docRef => {
            toast.success('The recipe was successfully marked as favorite!');
        }).catch(err => {
            toast.error('Unable to mark the recipe as favorite!');
        })

        setLoading(false);


    }

    const onDelete = (recipeId) => {
        if (window.confirm('Do you confirm recipe removal from favorites?')) {
            console.log(recipeId);


            const docRef = doc(db, 'users', auth.currentUser.uid);
            // const q = query(docRef, where('favorites', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));

            updateDoc(docRef, {
                favorites: arrayRemove(recipeId)
            })
            console.log(recipes)
            // const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
            // setFavRecipeData(updatedRecipes);
            toast.success('Successfully deleted');
        }

    }

    return (
        <>
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