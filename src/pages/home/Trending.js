import HeroBanner from '../../components/UI/HeroBanner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';

const apiKey = '2ed50f18cc1446178f98816f679672f1';
//const apiKey = 'a3577636ccd3420a92a088027e661830';
const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

const getRandom = () => client.get(BASE_URL);
const Trending = () => {
    const getRandomApi = useApi(getRandom);
    useEffect(() => {

        getRandomApi.request();
    }, []);

    return (
        <>
            <HeroBanner />
            <main>
                {getRandomApi.loading && <Spinner />}
                {getRandomApi.error && toast.error(getRandomApi.error)}

                <h1>Trending Recipes</h1>
                <section>
                    <Splide options={{
                        perPage: 4,
                        gap: '5rem',
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

                        {getRandomApi.data?.recipes.map((recipe) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <RecipeItem key={recipe.id} recipe={recipe} />
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                </section>

            </main>
        </>
    )
}

export default Trending;