import { useEffect, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getAuth } from 'firebase/auth';

import { useAuthStatus } from '../../hooks/useAuthStatus';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import Button from '../../components/UI/Button';
import HeroBanner from '../../components/UI/HeroBanner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import FavoritesContext from '../../context/FavoritesContext';

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


    const {loggedIn, loadingStatus} = useAuthStatus();

    const getRandomApi = useApi(getRandom);
    const auth = getAuth();

    useEffect(() => {
        // getRandomApi.request();
        console.log(auth);
        const fetchUserFavorites = async () => {
            console.log('eho')
            const userRef = doc(db, 'users', auth.currentUser.uid)
            const docSnap = await getDoc(userRef);
            let favs = [];
            if (docSnap?.exists()) {
                let userFavs = docSnap?.data()?.favorites;
                setFavorites(userFavs);
    
                // addToFavorites(userFavs);
             
               
                //  initFavorites(favorites);
               
                console.log(favs);
            }
        }
    
        fetchUserFavorites();
    }, []);

    console.log(favorites)

    const initFavs = () => {
    console.log(favorites.length);
    
            //  initFavorites(favorites);
    for (let rec of favorites) {
        console.log(rec);
        addToFavorites(rec);
  
    }
    // initFavorites()
      console.log(favoritesCtx);

    }

   if (loadingStatus) {
        return <Spinner/>
    }

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

                        {/* {getRandomApi.data?.recipes.map((recipe) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <RecipeItem key={recipe.id} recipe={recipe} />
                                </SplideSlide>
                            );
                        })} */}
                    </Splide>
                </section>

                <Button version='primary' onClick={initFavs}>Click here for magic</Button>
            </main>
        </>
    )
}

export default Trending;