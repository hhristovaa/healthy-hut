import classes from './Favorites.module.scss';
import FavoritesContext from '../../store/FavoritesContext';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { useContext } from 'react';

const Favorites = props => {
    const favoritesCtx = useContext(FavoritesContext);
    const hasFavorites = favoritesCtx.recipes.length > 0;

    const totalCount = favoritesCtx.totalCount;

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({...recipe, totalCount: 1});
    };

    const removeFromFavorites = id => {
        favoritesCtx.removeRecipe(id);
    };

    const favoritesItems = (
        <section>
            {favoritesCtx.recipes.map(recipe => {
                console.log(recipe);
                return (
                <RecipeItem key={recipe.id} recipe={recipe} onAdd={addToFavorites.bind(null, recipe)} onRemove={removeFromFavorites.bind(null, recipe.id)} isFavorite={recipe.favorite}/>
                );
            })}
        </section>
    )
    return (
        <main>
            <h1 className={classes['g-title']}>Favorites </h1>
        <h3>You have marked {totalCount} recipes as favorites.</h3>
            {favoritesItems}
        </main>
    );
}

export default Favorites;