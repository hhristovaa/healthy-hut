import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IonIcon } from '@ionic/react';
import { restaurantOutline, globeOutline, starOutline, timerOutline, manOutline, flagOutline, cashOutline, nutrition, leafOutline } from 'ionicons/icons';

import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import Spinner from '../../components/UI/Spinner';
import ToggleFavorites from '../../components/Favorites/ToggleFavorites';
import RecipeSlider from '../../components/Recipes/RecipeSlider';
import classes from './Recipes.module.scss';

const FullRecipe = () => {
    let params = useParams();
    const apiKey = '2ed50f18cc1446178f98816f679672f1';
    //const apiKey = 'cc1ef7f275ed420782a8c869acc377dd';
    //const apiKey = 'a3577636ccd3420a92a088027e661830';
    //const apiKey = 'b44514ae9c644024a55ec4e856cf0fd2';
    const BASE_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/information?includeNutrition=true&apiKey=${apiKey}`;

    // const NUTRITION_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/nutritionLabel.png?showOptionalNutrients=false&showZeroValues=false&showIngredients=false&apiKey=${apiKey}`
    // const NUTRITION_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/nutritionLabel?defaultCss=true&showOptionalNutrients=false&showZeroValues=false&showIngredients=false&apiKey=${apiKey}`
    const NUTRITION_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/nutritionWidget?defaultCss=true&apiKey=${apiKey}`


    const getDetails = (params) => client.get(BASE_URL);
    const getDetailsApi = useApi(getDetails);

    const getNutrition = (params) => client.get(NUTRITION_URL);
    //const getNutrition = (params) => client.get(`https://api.spoonacular.com/apiKey=2ed50f18cc1446178f98816f679672f1/recipes/648339/nutritionWidget.png`)
    const getNutritionApi = useApi(getNutrition);

    useEffect(() => {
        getDetailsApi.request(params.recipeId)
        getNutritionApi.request(params.recipeId)
    }, [params.recipeId]);

    let cuisine = getDetailsApi.data?.cuisines?.find(cuisine => cuisine !== undefined);
    let dishType = getDetailsApi.data?.dishTypes?.find(type => type !== undefined);


    return (
        <main>
            {getDetailsApi.loading && <Spinner />}
            {getDetailsApi.error && toast.error(getDetailsApi.error)}
            <section className={classes['recipe__header']}>
                <aside className={classes['recipe__header-container']}>
                    <img src={getDetailsApi.data?.image} alt={getDetailsApi.data?.title} />
                    <ToggleFavorites recipe={getDetailsApi.data} />

                    <div className={classes['recipe__ingredients']}>
                        <h4 className={classes['recipe__desc-title']}>Ingredients</h4>
                        <ul>
                            {getDetailsApi.data?.extendedIngredients?.map((ingredient) => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))}
                        </ul>

                    </div>

                </aside>
                <article className={classes['recipe__header-info']}>
                    <h3 className={classes['recipe__header-title']}>{getDetailsApi.data?.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: getDetailsApi.data?.summary }}></p>
                    <div className={classes['recipe__header-details']}>
                        <span>  <IonIcon icon={manOutline} /> {getDetailsApi.data?.servings} Servings</span>
                        <span> <IonIcon icon={timerOutline} /> {getDetailsApi.data?.readyInMinutes} Minutes</span>
                        {getDetailsApi.data?.lowFodmap && <span> <IonIcon icon={starOutline} /> FODMAP Friendly</span>}
                        {getDetailsApi.data?.cheap && <span> <IonIcon icon={cashOutline} /> Budget Friendly</span>}
                        {getDetailsApi.data?.veryHealthy && <span> <IonIcon icon={nutrition} /> Super Healthy</span>}
                        {getDetailsApi.data?.sustainable && <span> <IonIcon icon={leafOutline} /> Sustainable</span>}
                        {cuisine && (<span> <IonIcon icon={flagOutline} /> {cuisine}</span>)}
                        {dishType && (<span> <IonIcon icon={restaurantOutline} /> {dishType}</span>)}
                        <a href={getDetailsApi.data?.sourceUrl} target='_blank' rel='noreferrer'><IonIcon icon={globeOutline} />{getDetailsApi.data?.sourceUrl}</a>
                        <ul className={classes['recipe__diet']}>{getDetailsApi.data?.diets.map((diet) => (
                            <li key={diet.id}>{diet}</li>
                        ))}
                        </ul>
                    </div>
                </article>
            </section>
            <section className={classes['recipe__desc']}>

                {getDetailsApi.data?.instructions ? (
                    <div className={classes['recipe__instructions']}>
                        <h4 className={classes['recipe__desc-title']}>Instructions</h4>
                        <div dangerouslySetInnerHTML={{ __html: getDetailsApi.data?.instructions }}></div>
                    </div>
                ) : (
                    <p>Currently the instructions are not available.</p>
                )}
            </section>
            <section className={classes['recipe__facts']}>
                <h4 className={classes['recipe__desc-title']}>
                    Nutrition Facts per Serving
                </h4>
                {/* <div className={classes['recipe__nutrition']}
                    dangerouslySetInnerHTML={{ __html: getNutritionApi?.data }}>
                </div> */}
            </section>

            {/* <RecipeSlider recipeId={params.recipeId}/> */}
        </main>

    )

}

export default FullRecipe;