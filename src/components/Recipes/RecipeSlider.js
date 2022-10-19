import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import RecipeItem from './RecipeItem';
import client from '../../apis/client';
import Spinner from '../UI/Spinner';
import { SLIDER_OPTIONS } from '../../utils/constants';

const RecipeSlider = () => {
    let params = useParams();

    const BASE_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/similar/?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=6`
    const getSimilar = () => client.get(BASE_URL)

    const { isLoading, isError, error, data } = useQuery(['similar', params.recipeId], getSimilar);

    let content;

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return toast.error(error.message)
    } else {
        content = data;
    }

    return (
        <section>
            <h2>Similar Recipes</h2>
            <Splide options={SLIDER_OPTIONS}>
                {content?.data?.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <RecipeItem key={recipe.id} recipe={recipe} />
                        </SplideSlide>
                    );
                })}
            </Splide>
        </section>
    )
}

export default RecipeSlider;