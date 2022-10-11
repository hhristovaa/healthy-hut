import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import RecipeItem from './RecipeItem';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import Spinner from '../UI/Spinner';

const RecipeSlider = () => {
    let params = useParams();
    const apiKey = '2ed50f18cc1446178f98816f679672f1';
    const BASE_URL = `https://api.spoonacular.com/recipes/${params.recipeId}/similar/?apiKey=${apiKey}`
    const getSimilar = (params) => client.get(BASE_URL)
    const getSimilarApi = useApi(getSimilar);

    useEffect(() => {
        getSimilarApi.request(params.recipeId);
    }, [params.recipeId]);

    console.log(getSimilarApi.data.length);
    return (
        <section>
            {getSimilarApi.loading && <Spinner />}
            {getSimilarApi.error && toast.error(getSimilarApi.error)}

            <h2>Similar Recipes</h2>
            <Splide options={{
                perPage: 4,
                gap: '5rem',
                perMove: 1,
                breakpoints: {
                    986: {
                        perPage: 3
                    },
                    640: {
                        perPage: 2
                    },
                    425: {
                        perPage: 1
                    }
                }
            }}>         
                 {getSimilarApi?.data?.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <RecipeItem key={recipe.id} recipe={recipe}/>
                        </SplideSlide>
                    );
                })} 
            </Splide>
        </section>

    )

}

export default RecipeSlider;