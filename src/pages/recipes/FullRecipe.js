import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeSlider from '../../components/Recipes/RecipeSlider';
import classes from './Recipes.module.scss';
import { IonIcon } from '@ionic/react';
import { restaurantOutline, barChartOutline, listOutline, starOutline, timerOutline, manOutline, flagOutline } from 'ionicons/icons';


const FullRecipe = () => {
    let params = useParams();
    const [details, setDetails] = useState({});

    const getDetails = async () => {
        const apiKey = '2ed50f18cc1446178f98816f679672f1';

        const data = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?includeNutrition=true&apiKey=${apiKey}`);
        const detailData = await data.json();
        setDetails(detailData);
    }

    useEffect(() => {
        getDetails();
    }, [params.recipeId]);

    return (
        <main>
            <section className={classes['recipe__header']}>
                <aside className={classes['recipe__header-img']}> <img src={details.image} alt={details.title} />
                <div className={classes['recipe__header-details']}>
                <span>  <IonIcon icon={manOutline}/> {details.servings} Servings</span>
                        <span><IonIcon icon={timerOutline}/> {details.readyInMinutes} Minutes</span>
                    
                     
                        <ul>
                            {details.dishTypes?.map((type) => (
                               <li key={type.id}><IonIcon icon={restaurantOutline} /> {type} </li> 
                            ))}
                        </ul>

                        <ul>
                            {details.diets?.map((diet) => (
                               <li key={diet.id}><IonIcon icon={listOutline} /> {diet} </li> 
                            ))}
                        </ul>

                        
                        <ul>
                            {details.cuisines?.map((cuisine) => (
                               <li key={cuisine.id}><IonIcon icon={flagOutline} /> {cuisine} </li> 
                            ))}
                        </ul>


                    </div>
                </aside>
                <article className={classes['recipe__header-info']}>
                    <h2>{details.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>

   
                </article>
            </section>
            <section className={classes['recipe__desc']}>
                <div className={classes['recipe__ingredients']}>
                    <h4>Ingredients</h4>
                    <ul>
                        {details.extendedIngredients?.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>

                </div>
                {details.instructions ? (
                    <div className={classes['recipe__instructions']}>
                        <h4>Instructions</h4>
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