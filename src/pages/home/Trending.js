import { useEffect, useContext, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useQuery } from 'react-query';
import '@splidejs/react-splide/css';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';

import { useAuthStatus } from '../../hooks/useAuthStatus';

import client from '../../apis/client';
import Button from '../../components/UI/Button';
import HeroBanner from '../../components/UI/HeroBanner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import FavoritesContext from '../../context/FavoritesContext';
import { SLIDER_OPTIONS } from '../../utils/constants';

const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=10`;

const Trending = () => {

    const getRandom = async () => await client.get(BASE_URL).catch(function (error) {
        if (error.response && error.response.status === 402) {
            toast.error(error.response.message);
            return;
        }
    });

    const { isLoading, isError, error, data } = useQuery('trending', getRandom);
    
    let content;
    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return toast.error(error.message)
    } else {
        content = data;
    }



    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3 }}
            >
                <HeroBanner />
                <main>
                    <h1>Trending Recipes</h1>
                    <section>
                

                         <Splide options={SLIDER_OPTIONS}>
                            {content?.data?.recipes.map((recipe) => {
                                return (
                                    <SplideSlide key={recipe.id}>
                                        <RecipeItem key={recipe.id} recipe={recipe} />
                                    </SplideSlide>
                                );
                            })}
                        </Splide> 
                    </section>
                </main>
            </motion.div>
        </>
    )
}

export default Trending;