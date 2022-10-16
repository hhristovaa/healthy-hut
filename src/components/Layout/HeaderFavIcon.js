import { useContext, useEffect, useState, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


import { useAuthStatus } from '../../hooks/useAuthStatus';

import FavoritesContext from '../../context/FavoritesContext';
import classes from './HeaderFavIcon.module.scss';

const HeaderFavIcon = props => {
    const [btnIsAnimated, setBtnIsAnimated] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const favoritesCtx = useContext(FavoritesContext);
    const { recipes, initRecipe } = favoritesCtx;
    const favoritesCount = recipes?.length;
    const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ''}`;

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
            console.count('tuk')


            // addToFavorites(userFavs);


            //  initFavorites(favorites);

        }

    }

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    fetchUserFavorites();
                    initFavorites(favorites);
                    console.log(favorites)
                }
            });
        }
        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);

    useEffect(() => {
        // if (recipes.length === 0) return;

        initFavorites([recipes]);
        console.log('rezoltat');
        console.dir(recipes);

        setBtnIsAnimated(true);
        const timer = setTimeout(() => {
            setBtnIsAnimated(false);
        }, 300);

        // console.log(`recipes:`);
        // console.dir(recipes);
        // console.log(`rec length ${recipes?.length}`);


        return () => {
            clearTimeout(timer);
        };


    }, [recipes]);

    return (
        <button className={btnClasses}>
            <span className={classes.icon}>
                <IonIcon icon={heart} size='large' />
            </span>
            <span className={classes.badge}>
                {favoritesCount}
            </span>
        </button>
    );
}

export default HeaderFavIcon;