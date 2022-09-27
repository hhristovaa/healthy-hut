import classes from '../recipes/Recipes.module.scss';
import FavoritesContext from '../../context/FavoritesContext';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { useContext } from 'react';
import { getDocs, doc, docs, collection, query, where, orderBy, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import Spinner from '../../components/UI/Spinner';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favorites = props => {
    const auth = getAuth();
    const favoritesCtx = useContext(FavoritesContext);
    const hasFavorites = favoritesCtx.recipes.length > 0;

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
                toast.error('An error occured while loading the favorites.');
            }


        }

        fetchUserFavorites();
    }, [auth.currentUser.uid]);
    console.log(favorites)

    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            <h1 className={classes['g-title']}>Favorites </h1>
            {/* <h3 className={classes['recipes__counter']}>You have marked {favoritesCtx.recipes.length} recipes as favorites.</h3> */}
            <h3 className={classes['recipes__counter']}>You have marked {favorites.length} recipes as favorites.</h3>
            <section className={classes['recipes__container']}>
                {!loading && favorites?.length > 0 && favorites.map(recipe => {
                    return (
                        <RecipeItem
                            key={recipe?.id}
                            recipe={recipe}

                        />
                    );
                })}
                {/* <RecipeItem
                        key={favorite.id}
                        recipe={favorite.recipe}
                        
                    /> */}
            </section>
            {/* {favoritesItems} */}
        </main>
    );
}

export default Favorites;