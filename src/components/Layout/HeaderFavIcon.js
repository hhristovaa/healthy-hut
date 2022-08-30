import { useContext, useEffect, useState } from 'react';
import classes from './HeaderFavIcon.module.scss';
import { IonIcon } from '@ionic/react';
import { heart } from 'ionicons/icons';
// import CartIcon from '../Cart/CartIcon';
// import CartContext from '../../store/cart-context';
import FavoritesContext from '../../store/FavoritesContext';

const HeaderFavIcon = props => {
    const [btnIsAnimated, setBtnIsAnimated] = useState(false);
    const favoritesCtx = useContext(FavoritesContext);
    const { recipes } = favoritesCtx;

    const favoritesCount = recipes.reduce((currCount, recipe) => {
        return favoritesCount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsAnimated ? classes.bump : ''}`;

    useEffect(() => {
        if(recipes.length === 0) return; 

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
                <IonIcon icon={heart} size='large'/>
            </span>
            <span className={classes.badge}>
                {favoritesCount}
                {/* 5 */}
            </span>
        </button>
    );
}

export default HeaderFavIcon;