import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeSlider from '../../components/Recipes/RecipeSlider';
import classes from './Recipes.module.scss';
import { IonIcon } from '@ionic/react';
import { restaurantOutline, globeOutline, barChartOutline, listOutline, starOutline, timerOutline, manOutline, flagOutline } from 'ionicons/icons';
import Spinner from '../../components/UI/Spinner';

const FullRecipe = () => {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);

    const getDetails = async () => {
        const apiKey = '2ed50f18cc1446178f98816f679672f1';

        const data = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?includeNutrition=true&apiKey=${apiKey}`);
        const detailData = await data.json();
        setDetails(detailData);
        setLoading(false);
    }

    useEffect(() => {
        getDetails();
    }, [params.recipeId]);

    let cuisine = details.cuisines?.find(cuisine => cuisine !== undefined);
    let diet = details.diets?.find(diet => diet !== undefined);
    let dishType = details.dishTypes?.find(type => type !== undefined);

    if (loading) {
        return <Spinner />;
    }

    return (
        
        <main>
            <section className={classes['recipe__header']}>
                <aside className={classes['recipe__header-img']}> 
                <img src={details.image} alt={details.title} />

                </aside>
                <article className={classes['recipe__header-info']}>
                    <h3 className={classes['recipe__header-title']}>{details.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>

                    <div className={classes['recipe__header-details']}>
                        <span>  <IonIcon icon={manOutline} /> {details.servings} Servings</span>
                        <span> <IonIcon icon={timerOutline} /> {details.readyInMinutes} Minutes</span>

                        {diet && (<span> <IonIcon icon={listOutline} /> {diet}</span>)}
                        {cuisine && (<span> <IonIcon icon={flagOutline} /> {cuisine}</span>)}
                        {dishType && (<span> <IonIcon icon={restaurantOutline} /> {dishType}</span>)}

                        <a href={details.sourceUrl} target="_blank"><IonIcon icon={globeOutline} />{details.sourceUrl}</a>


                    </div>
                </article>
            </section>
            <section className={classes['recipe__desc']}>
                <div className={classes['recipe__ingredients']}>
                    <h4 className={classes['recipe__desc-title']}>Ingredients</h4>
                    <ul>
                        {details.extendedIngredients?.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}


                    </ul>

                </div>
                {details.instructions ? (
                    <div className={classes['recipe__instructions']}>
                        <h4 className={classes['recipe__desc-title']}>Instructions</h4>
                        <div dangerouslySetInnerHTML={{ __html: details.instructions }}></div>
                    </div>
                ) : (
                    <p>Currently the instructions are not available.</p>
                )}


            </section>








            {/* <RecipeSlider recipeId={params.recipeId}/> */}
        </main>

    )

}

export default FullRecipe;