import classes from '../recipes/Recipes.module.scss';
import FavoritesContext from '../../context/FavoritesContext';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { useContext } from 'react';
import { getDocs, doc, collection, query, where, orderBy, getDoc } from 'firebase/firestore';
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

    const [favorite, setFavorite] = useState([]);
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

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const fetchFavorites = async () => {
            // try {
                //get reference
                const favoritesRef = doc(db, 'users', auth.currentUser.uid);
              //  const q = query(favoritesRef, where('favorites', 'array-contains', 'id'), orderBy('timestamp', 'desc'));

               const docSnap = await getDoc(favoritesRef);

             //   const favoritesData = await getDocs(q);
                let favorites = [];
                console.log(docSnap.data());
               


                if (docSnap.exists()) {
                    console.log('data here');
                    let favData = docSnap.data().favorites;
                    console.log(favData);
                    // for (let fav of favData) {
                    //     console.log(fav);
                    // }
                    console.log(favorite);

                 favorites.push(favData.recipe);
                    setFavorite(favData)

                } else {
                    console.log('no data here');
                }

                console.log(favorite);
             
       

               
                // setFavorite(favorites);
                setLoading(false);
            // } catch (err) {
            //     setLoading(false);
            //     toast.error('An error occured while loading the favorites.');
            // }


        }

        fetchFavorites();
    }, [auth.currentUser.uid]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            <h1 className={classes['g-title']}>Favorites </h1>
            <h3 className={classes['recipes__counter']}>You have marked {favoritesCtx.recipes.length} recipes as favorites.</h3>
            <section className={classes['recipes__container']}>
            {!loading  && favorite?.length > 0 && favorite.map(recipe => {
                return (
                    <RecipeItem
                        key={recipe?.id}
                        recipe={recipe.data}
                        
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