import { Link } from 'react-router-dom';

import HeroBanner from '../components/UI/HeroBanner';
import RecipeItem from '../components/Recipes/RecipeItem';
import classes from './Trending.module.scss';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect } from 'react';
import Spinner from '../components/UI/Spinner';
import { toast } from 'react-toastify';
import useApi from '../hooks/useApi';
import client from '../apis/client';

const apiKey = '2ed50f18cc1446178f98816f679672f1';
const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

const getRandom = () => client.get(BASE_URL);

const Trending = () => {

    const getRandomApi = useApi(getRandom);

    useEffect(() => {
        getRandomApi.request();
    }, []);


    // //runs fetch trending when the component is mounted
    // useEffect(() => {
    //     fetchTrending();
    // }, []);

    // const fetchTrending = async () => {
    //     //cache - there is no need to fetch recipes every time
    //     //store in local storage, check if there si something
    //     //in local storage you can save strings; JSON.
    //     //JSON.parse - parsing from string to array
    //     //JSON stringify - opposite of it

    //     const checkLocalStorage = localStorage.getItem('trending');
    //     if (checkLocalStorage) {
    //         let trendingRecipes = JSON.parse(checkLocalStorage);
    //         setTrending(trendingRecipes)
    //     } else {
    //         const apiKey = '2ed50f18cc1446178f98816f679672f1';
    //         const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`);
    //         const data = await api.json();
    //         const recipesString = JSON.stringify(data.recipes);
    //         localStorage.setItem('trending', recipesString);

    //         setTrending(data.recipes);
    //     }

    // };

    return (
        <>
            <HeroBanner />

            <main>

                {getRandomApi.loading && <Spinner />}
                {getRandomApi.error && toast.error(getRandomApi.error)}

                <h1>Trending</h1>
                <section className={classes['trending-recipes']}>
                    <Splide options={{
                        perPage: 4,
                        gap: '5rem'
                    }}>


                        {getRandomApi.data?.recipes.map((recipe) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <RecipeItem key={recipe.id} recipe={recipe}>
                                    </RecipeItem>
                                </SplideSlide>
                            );

                        })}
                    </Splide>

                </section>



                <Link to='/recipes'>
                    All Recipes
                </Link>

                <Link to='/articles'>
                    All articles
                </Link>

            </main>
        </>
    )
}

export default Trending;