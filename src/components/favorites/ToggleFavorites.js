import { useState, useContext, useEffect } from 'react';
import Spinner from '../../components/UI/Spinner';
import Button from '../../components/UI/Button';
import classes from './ToggleFavorites.module.scss';
import { IonIcon } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import FavoritesContext from '../../store/FavoritesContext';
// import FavoritesProvider from '../../store/FavoritesProvider';

const ToggleFavorites = (props) => {
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);
    // const [neshtoSiId, setNeshtoSiId] = useState(props?.recipe?.id);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const favoritesCtx = useContext(FavoritesContext);
    const { recipes } = favoritesCtx;

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({ ...recipe});
    };

    const removeFromFavorites = id => {
        favoritesCtx.removeRecipe(id);
    };

    const toggleFavorite = () => {
        favorite ? removeFromFavorites(props.recipe.id) : addToFavorites(props.recipe);
        setFavorite(!favorite);
    }

    // useEffect(() => {
    //     // const isFavorite = recipes?.some(recipe => recipe.id === props.recipe.id) ?? false;

    //     // setFavorite(isFavorite);

    //     const result = recipes?.some(recipe => recipe.id === props.recipe.id) ?? false;
    //     console.log(result);

    //     return false;
    // }, [recipes, props?.recipe?.id]);

    useEffect(() => {
        const newNewFavoriteNeshtoSi = recipes.some(recipe => recipe.id === props?.recipe?.id);

        setFavorite(newNewFavoriteNeshtoSi);
    }, [favorite, recipes, props]);

    if (loading) {
        return <Spinner />
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