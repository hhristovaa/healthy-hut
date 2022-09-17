import classes from '../recipes/Recipes.module.scss';
import FavoritesContext from '../../store/FavoritesContext';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { useContext } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { selectFavoritesError, selectFavoritesIsLoading, selectFavoritesList, selectFavoritesLoading } from '../../redux/favorites/favoritesSelectors';
import { fetchFavorites } from '../../redux/favorites/favoritesThunks';
import { useEffect } from 'react';


const Favorites = props => {

    const favoritesCtx = useContext(FavoritesContext);
    const hasFavorites = favoritesCtx.recipes.length > 0;

    const totalCount = favoritesCtx.totalCount;

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({ ...recipe, totalCount: 1 });
    };

    const removeFromFavorites = id => {
        favoritesCtx.removeRecipe(id);
    };


    const dispatch = useDispatch();
    const favoritesList = useSelector(selectFavoritesList);
    const isLoading = useSelector(selectFavoritesIsLoading);
    const error = useSelector(selectFavoritesError);

    useEffect(() => {
dispatch(fetchFavorites());
    }, [dispatch]);

    console.log(favoritesList);

    const favoritesItems = (
        <section className={classes['recipes__container']}>
            {favoritesCtx.recipes.map(recipe => {
                return (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onAdd={addToFavorites.bind(null, recipe)}
                        onRemove={removeFromFavorites.bind(null, recipe.id)}
                        isFavorite={recipe.favorite}
                    />
                );
            })}
        </section>
    );

    return (
        <main>
            <h1 className={classes['g-title']}>Favorites </h1>
            <h3 className={classes['recipes__counter']}>You have marked {totalCount} recipes as favorites.</h3>
            {/* {favoritesItems} */}
            
        </main>
    );
}

export default Favorites;