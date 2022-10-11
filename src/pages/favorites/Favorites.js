import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';

import FavoritesContext from '../../context/FavoritesContext';
import Spinner from '../../components/UI/Spinner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import classes from '../recipes/Recipes.module.scss';

const Favorites = () => {
    const auth = getAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // const favoritesItems = (
    //     <section className={classes['recipes__container']}>
    //         {favoritesCtx.recipes.map(recipe => {
    //             return (
    //                 <RecipeItem
    //                     key={recipe.id}
    //                     recipe={recipe}
    //                 />
    //             );
    //         })}
    //     </section>
    // );




    useEffect(() => {
        const controller = new AbortController();
      

        const fetchUserFavorites = async () => {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid)
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    let userFavs = docSnap?.data()?.favorites;
                    setFavorites(userFavs);
                }

                setLoading(false);
            } catch (err) {
                setLoading(false);
                toast.error('An error occurred while loading the favorites.');
            }
        }

        fetchUserFavorites();
        return () => controller.abort();
    }, [auth.currentUser.uid]);

if (loading) {
    return <Spinner/>
}
    return (
        <main>
            <h1 className={classes['g-title']}>Favorites </h1>
            <h3 className={classes['recipes__counter']}>You have marked {favorites?.length} recipes as favorites.</h3>
            <section className={classes['recipes__container']}>


                {!loading && favorites?.length > 0 && favorites.map(recipe => {
                    return (
                        <RecipeItem
                            key={recipe?.id}
                            recipe={recipe}
                        />
                    );
                })}
            </section>
        </main>
    );
}

export default Favorites;