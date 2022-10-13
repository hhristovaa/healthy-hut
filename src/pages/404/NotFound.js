import { Link } from 'react-router-dom';
import { homeOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { motion } from 'framer-motion';

import notFoundSvg from '../../assets/svg/404.svg';
import classes from './NotFound.module.scss';

const NotFound = () => {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            <h1 className={classes['g-title']}>404 - Page not found</h1>
            <div className={classes['not-found']}>
                <img src={notFoundSvg} alt="Oops! Page not found!" className={classes['not-found__image']} />
                <small><a href='https://storyset.com/web'>Web illustrations by Storyset</a></small>
                <Link to='/'>
                    <IonIcon icon={homeOutline} size='large'>Home </IonIcon>
                </Link>
            </div>
        </motion.main>

    )
}

export default NotFound;