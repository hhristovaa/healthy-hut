import classes from './Favorites.module.scss';
import FavoritesContext from '../../store/FavoritesContext';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { useContext } from 'react';

const Favorites = props => {
    const favoritesCtx = useContext(FavoritesContext);
    const hasFavorites = favoritesCtx.recipes.length > 0;

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({...recipe});
    };

    const removeFromFavorites = id => {
        favoritesCtx.removeRecipe(id);
    };

    const favoritesItems = (
        <section>
            {favoritesCtx.recipes.map(recipe => {
                <RecipeItem onAdd={addToFavorites.bind(null, recipe)} onRemove={removeFromFavorites.bind(null, recipe.id)}/>
            })}
        </section>
    )
    return (
        <main>
            <h1>Favorites</h1>
            {favoritesItems}
        </main>
    );
}

export default Favorites;