import classes from './RecipeItem.module.scss';
import Card from '../UI/Card';
import { IonIcon } from '@ionic/react';
import { timerOutline, starOutline, heartOutline, heart } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg'

const RecipeItem = () => {
    return (
        <Card className={classes['recipe__card']}>
            <div className={classes['recipe__card-img']}>
                <img src={avatar} alt="" />
            </div>
            <p className={classes['recipe__card-title']}>Vegan Panacotta</p>
            <div className={classes['recipe__card-info']}>
                <span className={classes['recipe__card-time']}>
                    <IonIcon icon={timerOutline}/> 20 Minutes
                </span>

                <span className={classes['recipe__card-rating']}>
                    <IonIcon icon={starOutline}/> 
                </span>

            </div>
        </Card>

        
    )
}

export default RecipeItem;