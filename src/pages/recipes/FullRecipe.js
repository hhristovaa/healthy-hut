import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { IonIcon } from '@ionic/react';
import { restaurantOutline, globeOutline, starOutline, timerOutline, manOutline, flagOutline, cashOutline, nutrition, leafOutline } from 'ionicons/icons';

import client from '../../apis/client';
import Spinner from '../../components/UI/Spinner';
import ToggleFavorites from '../../components/Favorites/ToggleFavorites';
import RecipeSlider from '../../components/Recipes/RecipeSlider';
import classes from './Recipes.module.scss';

const FullRecipe = () => {
    let params = useParams();

    const BASE_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`;
    const NUTRITION_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/nutritionWidget?defaultCss=true&apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`

    const getDetails = async () => await client.get(BASE_URL);
    const getNutrition = async () => await client.get(NUTRITION_URL);

    const {
        isLoading: loadingDetails,
        error: errorDetails,
        data: detailsData,
      } = useQuery(['details', params.recipeId], getDetails);

      const {
        isLoading: loadingNutrition,
        error: errorNutrition,
        data: nutritionData,
      } = useQuery(['nutrition', 'details', params.recipeId], getNutrition,  {
        enabled: detailsData && Object.keys(detailsData).length > 0,
      });

    let content;

    if (loadingDetails) {
        return <Spinner />
    } else if (errorDetails) {
        return toast.error(errorDetails.message)
    } else {
        content = detailsData;
    }

    let cuisine = content.data?.cuisines?.find(cuisine => cuisine !== undefined);
    let dishType = content.data?.dishTypes?.find(type => type !== undefined);

    return (
        <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
    >
            <section className={classes['recipe__header']}>
                <aside className={classes['recipe__header-container']}>
                    <img src={content.data?.image} alt={content.data?.title} />
                    <ToggleFavorites recipe={content.data} />

                    <div className={classes['recipe__ingredients']}>
                        <h4 className={classes['recipe__desc-title']}>Ingredients</h4>
                        <ul>
                            {content.data?.extendedIngredients?.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>
                    </div>

                </aside>
                <article className={classes['recipe__header-info']}>
                    <h3 className={classes['recipe__header-title']}>{content.data?.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: content.data?.summary }}></p>
                    <div className={classes['recipe__header-details']}>
                        <span>  <IonIcon icon={manOutline} /> {content.data?.servings} Servings</span>
                        <span> <IonIcon icon={timerOutline} /> {content.data?.readyInMinutes} Minutes</span>
                        {content.data?.lowFodmap && <span> <IonIcon icon={starOutline} /> FODMAP Friendly</span>}
                        {content.data?.cheap && <span> <IonIcon icon={cashOutline} /> Budget Friendly</span>}
                        {content.data?.veryHealthy && <span> <IonIcon icon={nutrition} /> Super Healthy</span>}
                        {content.data?.sustainable && <span> <IonIcon icon={leafOutline} /> Sustainable</span>}
                        {cuisine && (<span> <IonIcon icon={flagOutline} /> {cuisine}</span>)}
                        {dishType && (<span> <IonIcon icon={restaurantOutline} /> {dishType}</span>)}
                        <a href={content.data?.sourceUrl} target='_blank' rel='noreferrer'><IonIcon icon={globeOutline} />{content.data?.sourceUrl}</a>
                        <ul className={classes['recipe__diet']}>{content.data?.diets.map((diet) => (
                            <li key={diet}>{diet}</li>
                        ))}
                        </ul>
                    </div>
                </article>
            </section>
            <section className={classes['recipe__desc']}>

                {content.data?.instructions ? (
                    <div className={classes['recipe__instructions']}>
                        <h4 className={classes['recipe__desc-title']}>Instructions</h4>
                        <div dangerouslySetInnerHTML={{ __html: content.data?.instructions }}></div>
                    </div>
                ) : (
                    <p>Currently the instructions are not available.</p>
                )}
            </section> 
            <section className={classes['recipe__facts']}>
                <h4 className={classes['recipe__desc-title']}>
                    Nutrition Facts per Serving
                </h4>
                {loadingNutrition && <p>Currently the nutrition facts are not available.</p>}
                {errorNutrition && toast.error(errorNutrition.message)}
                {nutritionData?.data ? (<div className={classes['recipe__nutrition']}
                    dangerouslySetInnerHTML={{ __html: nutritionData?.data}}>
                </div>) : (
                    <p>Currently the nutrition facts are not available.</p>
                )}
            </section>

         <RecipeSlider recipeId={params.recipeId}/>
        </motion.main>

    )

}

export default FullRecipe;