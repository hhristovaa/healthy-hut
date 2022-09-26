import classes from './NotFound.module.scss';
import notFoundSvg from '../../assets/svg/404.svg';
import { Link } from 'react-router-dom';
import { homeOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';


const NotFound = () => {
    return (<main>
        <h1 className={classes['g-title']}>404 - Page not found</h1>
        <div className={classes['not-found']}>
            <img src={notFoundSvg} alt="Oops! Page not found!" className={classes['not-found__image']} />
            <small><a href='https://storyset.com/web'>Web illustrations by Storyset</a></small>
            <Link to='/'><IonIcon icon={homeOutline} size='large'>Home </IonIcon></Link>
        </div>
    </main>

    )
}

export default NotFound;