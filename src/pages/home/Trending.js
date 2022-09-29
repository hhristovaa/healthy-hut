import HeroBanner from '../../components/UI/HeroBanner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import Button from '../../components/UI/Button';
import FavoritesContext from '../../context/FavoritesContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';
import { add } from 'ionicons/icons';

//const apiKey = '2ed50f18cc1446178f98816f679672f1';
const apiKey = 'a3577636ccd3420a92a088027e661830';
const BASE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`;

const getRandom = () => client.get(BASE_URL);

const Trending = () => {
    const [favorites, setFavorites] = useState([]);

    const favoritesCtx = useContext(FavoritesContext);

    const initFavorites = recipes => {
        favoritesCtx.initRecipe(recipes)
    }

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({ ...recipe });
    };


    const getRandomApi = useApi(getRandom);
    const auth = getAuth();

    useEffect(() => {


        getRandomApi.request();
    }, []);



    const fetchUserFavorites = async () => {
        console.log('eho')
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userRef);
        let favs = [];
        if (docSnap?.exists()) {
            let userFavs = docSnap?.data()?.favorites;
            addToFavorites(userFavs)
            // setFavorites(userFavs)
            // favorites.map(recipe => {
            //     console.log(recipe);
            //     favs.push(recipe);
            // });

           
            // initFavorites(favorites);
           
            console.log(favs);
        }
    }

    console.log(favorites)

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

                <Button version='primary' onClick={fetchUserFavorites}>Click here for magic</Button>
            </main>
        </>
    )
}

export default Trending;