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
    
    const addToFavoritesHandler = () => {
        favoritesCtx.addRecipe({
            id: recipe.id,

        })

    }


    return (
        <Link to={`/recipe/${recipe.id}`} className={classes['recipe-redirect']}>
        <Card className={classes['recipe__card']} recipe={props.recipe}>
            
            <div className={classes['recipe__card-img']}>
                <img src={recipe.image} alt="" />
                <IonIcon class={classes['recipe-favorites']}icon={favorite ? heart : heartOutline} size='large' onClick={favoritesHandler} />
            </div>
            <p className={classes['recipe__card-title']}>{recipe.title}</p>
            <div className={classes['recipe__card-info']}>
                <span className={classes['recipe__card-details']}>
                    <IonIcon icon={timerOutline}/> {recipe.readyInMinutes} Minutes
                </span>

                <span className={classes['recipe__card-details']}>
                    <IonIcon icon={manOutline}/> {recipe.servings} Servings
                </span>

            </div>
        </Card>
        </Link>
        
    )
}

export default RecipeItem;