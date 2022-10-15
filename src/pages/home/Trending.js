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


const Trending = () => {
    const apiKey = '2ed50f18cc1446178f98816f679672f1';
    // const apiKey = 'a3577636ccd3420a92a088027e661830';
    const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

    const getRandom = async () => await client.get(BASE_URL).catch(function (error) {
        if (error.response && error.response.status === 402) {
            toast.error(error.response.message);
            return;
        }
    });
    const [favorites, setFavorites] = useState([]);

    const favoritesCtx = useContext(FavoritesContext);

    const initFavorites = recipes => {
        favoritesCtx.initRecipe(recipes)
    }

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({ ...recipe });
    };


    const { loggedIn, loadingStatus } = useAuthStatus();

    const auth = getAuth();
    const isMounted = useRef(true);

    const fetchUserFavorites = async () => {
        console.log('eho')
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userRef);
        if (docSnap?.exists()) {
            let userFavs = docSnap?.data()?.favorites;
            setFavorites(userFavs);
            console.log('eho2')

            // addToFavorites(userFavs);


            //  initFavorites(favorites);

        }

    }

    useEffect(() => {
        // getRandomApi.request();
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    fetchUserFavorites();

                }
            });
        }
        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);

    console.log(favorites)

    const initFavs = () => {
        //  initFavorites(favorites);
        for (let rec of favorites) {
            console.log(rec);
            addToFavorites(rec);

        }
        //initFavorites(favorites)

    }

    const { isLoading, isError, error, data } = useQuery('trending', getRandom);
    let content;
    if (loadingStatus) {
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

                    <Button version='primary' onClick={initFavs}>Click here for magic</Button>
                </main>
            </motion.div>

            </main>

        </>
    )
}

export default Trending;