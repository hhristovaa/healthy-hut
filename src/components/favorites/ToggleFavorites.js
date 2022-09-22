import { useState, useEffect, useRef, useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { v4 as uuid4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner';
import { toast } from 'react-toastify';
import { uuidv4 } from '@firebase/util';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import classes from './ToggleFavorites.module.scss';
import { isFieldEmpty } from '../../utils/utils';
import { IonIcon } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import FavoritesContext from '../../store/FavoritesContext';

const ToggleFavorites = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    const favoritesCtx = useContext(FavoritesContext);

    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [favRecipeData, setFavRecipeData] = useState({
        id: '',
        title: '',
        image: '',
        servings: '',
        readyInMinutes: '',
    });

    const favoritesHandler = (e) => {
        e.preventDefault();
        setFavorite(prevState => !prevState);
    }

    const toggleFavorites = (e) => {
        e.preventDefault();
        
        if (favorite) {
            removeFromFavoritesHandler(e);
        } else {
            addToFavoritesHandler(e)
            //onSubmit(e);
        }
        
        favoritesHandler(e);
    }

    const removeFromFavoritesHandler = (e) => {
        favoritesCtx.removeRecipe(props.recipe.recipeId);
    }

    const addToFavoritesHandler = (e) => {
        favoritesCtx.addRecipe({
            id: props.recipe.id,
            recipe: props.recipe,
            title: props.recipe?.title,
            image: props.recipe?.image,
            servings: props.recipe?.servings,
            readyInMinutes: props.recipe?.readyInMinutes,
            favorite: true
        });
    }

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFavRecipeData({
                        id: props.recipe?.id,
                        recipe: props.recipe,
                        title: props.recipe?.title,
                        image: props.recipe?.image,
                        servings: props.recipe?.servings,
                        readyInMinutes: props.recipe?.readyInMinutes,
                        favorite: true,
                        userRef: user.uid
                    });
                } else {
                    navigate('/sign-in');
                }
            });

        }

        return () => {
            isMounted.current = false;
        }

    }, [isMounted]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const recipeDataCopy = {
            id: props.recipe.id,
            recipe: props.recipe,
            title: props.recipe?.title,
            image: props.recipe?.image,
            servings: props.recipe?.servings,
            readyInMinutes: props.recipe?.readyInMinutes,
            favorite: true,

            timestamp: serverTimestamp()
        };

        console.log(recipeDataCopy);

        const docRef = await addDoc(collection(db, 'favorites'), recipeDataCopy);

        setLoading(false);
        toast.success('The recipe was successfully marked as favorite!');
    }


    if (loading) {
        return <Spinner />
    }

    return (
        <span
            className={classes['recipe__favorites']}
            onClick={toggleFavorites}>
            <IonIcon icon={favorite ? heart : heartOutline} size='large' />
            {favorite ? 'Remove From Favorites' : 'Add To Favorites'}
        </span>
    )
}

export default ToggleFavorites;