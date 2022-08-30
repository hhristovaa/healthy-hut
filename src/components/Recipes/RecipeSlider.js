import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect, useState } from 'react';
import RecipeItem from './RecipeItem';

const RecipeSlider = (props) => {
    const [recipes, setRecipes] = useState([]);
    console.log(props.recipeId);

    useEffect(() => {
        fetchRecipes(props.recipeId);
    }, [props.recipeId]);

    const fetchRecipes = async (recipeId) => {
        //cache - there is no need to fetch recipes every time
        //store in local storage, check if there si something
        //in local storage you can save strings; JSON.
        //JSON.parse - parsing from string to array
        //JSON stringify - opposite of it

            const apiKey = '2ed50f18cc1446178f98816f679672f1';
            const api = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/similar/?apiKey=${apiKey}`);
            const data = await api.json();


            setRecipes(data.recipes);
            console.log(data.recipes);
        }

    

    return(
        <section>
        <Splide options={{
            perPage: 4,
            gap: '10rem'
        }}>


            {recipes?.map((recipe) => {
                return (
                    <SplideSlide key={recipe.id}>
                        <RecipeItem key={recipe.id} recipe={recipe}>
                        </RecipeItem>
                    </SplideSlide>
                );

            })}
        </Splide>

    </section>

    )

}

export default RecipeSlider;