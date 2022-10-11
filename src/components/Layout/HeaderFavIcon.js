import { useContext, useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';

import FavoritesContext from '../../context/FavoritesContext';
import classes from './HeaderFavIcon.module.scss';

const HeaderFavIcon = props => {
    const [btnIsAnimated, setBtnIsAnimated] = useState(false);
    const favoritesCtx = useContext(FavoritesContext);
    const { recipes } = favoritesCtx;
    const favoritesCount = favoritesCtx.recipes?.length;
    const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ''}`;

    useEffect(() => {
        // if (recipes.length === 0) return;

        setBtnIsAnimated(true);
        const timer = setTimeout(() => {
            setBtnIsAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [recipes]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
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