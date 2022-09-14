import classes from './RecipeItem.module.scss';
import Card from '../UI/Card';
import { IonIcon } from '@ionic/react';
import { timerOutline, manOutline, heartOutline, heart } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import FavoritesContext from '../../store/FavoritesContext';
import { useContext, useState } from 'react';

const RecipeItem = (props) => {
    let recipe = props.recipe;
    const favoritesCtx = useContext(FavoritesContext);
    const [favorite, setFavorite] = useState(false);

    const favoritesHandler = (e) => {
        e.preventDefault();
        setFavorite(prevState => !prevState);
    }

    const toggleFavorites = (e) => {
        e.preventDefault();

        if (favorite) {
            removeFromFavoritesHandler(e);
        } else {
            addToFavoritesHandler(e)
        }
        favoritesHandler(e);
    }

    const removeFromFavoritesHandler = (e) => {
        favoritesCtx.removeRecipe(recipe.id);
    }

    const addToFavoritesHandler = (e) => {
        favoritesCtx.addRecipe({
            id: recipe.id,
            recipe: recipe,
            title: recipe.title,
            image: recipe.image,
            servings: recipe.servings,
            readyInMinutes: recipe.readyInMinutes,
            favorite: true

        });
    }

    const BASE_IMG_URL = ` https://spoonacular.com/recipeImages/${recipe.id}-240x150.${recipe.imageType}`;

    return (
        <>
            <Link to={`/recipe/${recipe.id}`} className={classes['recipe-redirect']}>
                <Card className={classes['recipe__card']} recipe={props.recipe}>

                    <div className={classes['recipe__card-img']}>
                        <img src={recipe.image ? recipe.image : BASE_IMG_URL} alt={recipe.title} />
                        <IonIcon class={classes['recipe-favorites']} icon={favorite ? heart : heartOutline} size='large' onClick={toggleFavorites} />
                    </div>
                    <p className={classes['recipe__card-title']}>{recipe.title}</p>
                    <div className={classes['recipe__card-info']}>
                        <span className={classes['recipe__card-details']}>
                            <IonIcon icon={timerOutline} /> {recipe.readyInMinutes} Minutes
                        </span>

                        <span className={classes['recipe__card-details']}>
                            <IonIcon icon={manOutline} /> {recipe.servings} Servings
                        </span>

                    </div>


                </Card>
            </Link>

        </>
    )
}

export default RecipeItem;