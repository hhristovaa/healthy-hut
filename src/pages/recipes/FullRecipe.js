import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeSlider from '../../components/Recipes/RecipeSlider';
import classes from './Recipes.module.scss';
import { IonIcon } from '@ionic/react';
import { restaurantOutline, globeOutline, barChartOutline, listOutline, starOutline, timerOutline, manOutline, flagOutline } from 'ionicons/icons';
import Spinner from '../../components/UI/Spinner';
import {toast} from 'react-toastify';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';

const FullRecipe = () => {
    let params = useParams();
   // const apiKey = '2ed50f18cc1446178f98816f679672f1';
    const apiKey = 'a3577636ccd3420a92a088027e661830';
    const BASE_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/information?includeNutrition=true&apiKey=${apiKey}`;
   
    const NUTRITION_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/&apiKey=${apiKey}/nutritionLabel.png`

    const getDetails = (params) => client.get(BASE_URL)
    const getDetailsApi = useApi(getDetails);

    const getNutrition = (params) => client.get(NUTRITION_URL)
    const getNutritionApi = useApi(getNutrition);

    useEffect(() => {
        getDetailsApi.request(params.recipeId)
        getNutritionApi.request(params.recipeId)
    }, [params.recipeId]);

    let cuisine = getDetailsApi.data?.cuisines?.find(cuisine => cuisine !== undefined);
    let dishType = getDetailsApi.data?.dishTypes?.find(type => type !== undefined);

    {getDetailsApi.loading && <Spinner />}
    {getDetailsApi.error && toast.error(getDetailsApi.error)}

    console.log(getNutritionApi);

    return (
 

        <main>
            <section className={classes['recipe__header']}>
                <aside className={classes['recipe__header-img']}> 
                <img src={getDetailsApi.data?.image} alt={getDetailsApi.data?.title} />

                </aside>
                <article className={classes['recipe__header-info']}>
                    <h3 className={classes['recipe__header-title']}>{getDetailsApi.data?.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: getDetailsApi.data?.summary }}></p>

                    <div className={classes['recipe__header-details']}>
                        <span>  <IonIcon icon={manOutline} /> {getDetailsApi.data?.servings} Servings</span>
                        <span> <IonIcon icon={timerOutline} /> {getDetailsApi.data?.readyInMinutes} Minutes</span>
                        {getDetailsApi.data?.lowFodmap && <span> <IonIcon icon={starOutline} /> FODMAP Friendly</span>}
                        {cuisine && (<span> <IonIcon icon={flagOutline} /> {cuisine}</span>)}
                        {dishType && (<span> <IonIcon icon={restaurantOutline} /> {dishType}</span>)}
                        <a href={getDetailsApi.data?.sourceUrl}  target='_blank' rel='noreferrer'><IonIcon icon={globeOutline} />{getDetailsApi.data?.sourceUrl}</a>
                        <ul className={classes['recipe__diet']}>{getDetailsApi.data?.diets.map((diet) => (
                            <li>{diet}</li>
                        ))}
                        </ul>
                    </div>
                </article>
            </section>
            <section className={classes['recipe__desc']}>
                <div className={classes['recipe__ingredients']}>
                    <h4 className={classes['recipe__desc-title']}>Ingredients</h4>
                    <ul>
                        {getDetailsApi.data?.extendedIngredients?.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>

                </div>
                {getDetailsApi.data?.instructions ? (
                    <div className={classes['recipe__instructions']}>
                        <h4 className={classes['recipe__desc-title']}>Instructions</h4>
                        <div dangerouslySetInnerHTML={{ __html: getDetailsApi.data?.instructions }}></div>
                    </div>
                ) : (
                    <p>Currently the instructions are not available.</p>
                )}


            </section>








            <RecipeSlider recipeId={params.recipeId}/>
        </main>

    )

}

export default FullRecipe;