import classes from './RecipeItem.module.scss';
import Card from '../UI/Card';
import { IonIcon } from '@ionic/react';
import { timerOutline, manOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const RecipeItem = (props) => {
    let recipe = props.recipe;

    const BASE_IMG_URL = ` https://spoonacular.com/recipeImages/${recipe?.id}-240x150.${recipe?.imageType}`;

    return (
            <Link to={`/recipe/${recipe.id}`} className={classes['recipe-redirect']}>
                <Card className={classes['recipe__card']} recipe={recipe}>
                    <div className={classes['recipe__card-img']}>
                        <img src={recipe.image ? recipe.image : BASE_IMG_URL} alt={recipe.title} />
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
    )
}

export default RecipeItem;