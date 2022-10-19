import { useContext, useEffect, useState, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useAuthStatus } from '../../hooks/useAuthStatus';
import FavoritesContext from '../../context/FavoritesContext';
import classes from './HeaderFavoriteIcon.module.scss';

const HeaderFavoriteIcon = props => {
    const [btnIsAnimated, setBtnIsAnimated] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const favoritesCtx = useContext(FavoritesContext);
    const { recipes } = favoritesCtx;
    const favoritesCount = recipes?.length;
    const btnClasses = `${classes.favorites} ${btnIsAnimated ? classes.bump : ''}`;

    const initFavorites = recipes => {
        favoritesCtx.initRecipes(recipes)
    }

    const auth = getAuth();
    const isMounted = useRef(true);

    const fetchUserFavorites = async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userRef);
        if (docSnap?.exists()) {
            let userFavs = docSnap?.data()?.favorites;
            setFavorites(userFavs);
        }
    }

    useEffect(() => {
        const auth = getAuth();
        if (!!auth) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            getDoc(userRef).then(docSnap => {
                if (docSnap?.exists()) {
                    let userFavs = docSnap?.data()?.favorites;
                    let updatedRecipes = !!userFavs ? userFavs : [];
                    initFavorites(updatedRecipes);
                }
            }).catch(err => {
                console.log('userFavs fetch failed: ');
                console.error(err);
            });
        }
    }, [auth]);

    useEffect(() => {
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

    useEffect(() => {
        if (favoritesCount === 0) return;

        setBtnIsAnimated(true);
        const timer = setTimeout(() => {
            setBtnIsAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [favoritesCount]);

    return (
        <button className={btnClasses}>
            <span className={classes.icon}>
                <IonIcon icon={heart} size='large' />
            </span>
            <span className={classes.badge}>
                {favoritesCount ?? 0}
            </span>
        </button>
    );
}

export default HeaderFavoriteIcon;