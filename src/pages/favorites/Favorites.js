import classes from '../recipes/Recipes.module.scss';
import FavoritesContext from '../../store/FavoritesContext';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { useContext } from 'react';
import { getDocs, doc, collection, query, where, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import Spinner from '../../components/UI/Spinner';
import {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favorites = props => {
    const favoritesCtx = useContext(FavoritesContext);
    const hasFavorites = favoritesCtx.recipes.length > 0;

    const totalCount = favoritesCtx.totalCount;

    const addToFavorites = recipe => {
        favoritesCtx.addRecipe({ ...recipe, totalCount: 1 });
    };

    const removeFromFavorites = id => {
        favoritesCtx.removeRecipe(id);
    };


    const [favorite, setFavorite] = useState(null);
    const [loading, setLoading] = useState(true);

    const favoritesItems = (
        <section className={classes['recipes__container']}>
            {favoritesCtx.recipes.map(recipe => {
                return (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onAdd={addToFavorites.bind(null, recipe)}
                        onRemove={removeFromFavorites.bind(null, recipe.id)}
                        isFavorite={recipe.favorite}
                    />
                );
            })}
        </section>
    );

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                //get reference
                const favoritesRef = collection(db, 'favorites');
                const q = query(favoritesRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
            
                const favoritesData = await getDocs(q);
                const favorites = [];

                favoritesData.docs.forEach(favorite => {
                    return favorites.push({
                        id: favorite.id,
                        data: favorite.data()
                    });

                });

                setFavorite(favorites);
                setLoading(false);
            } catch (err) {
                toast.error('An error occured while loading the favorites.');
            }


        }

        fetchFavorites();
    }, [auth.currentUser.uid]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            <h1 className={classes['g-title']}>Favorites </h1>
            <h3 className={classes['recipes__counter']}>You have marked {totalCount} recipes as favorites.</h3>
            <section className={classes['recipes__container']}>
            {!loading  && favorite?.length > 0 && favorite.map(recipe => {
                return (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe.data}
                        onAdd={addToFavorites.bind(null, recipe)}
                        onRemove={removeFromFavorites.bind(null, recipe.id)}
                        isFavorite={recipe.favorite}
                    />
                );
            })}
        </section>
        </main>
    );
}

export default Favorites;