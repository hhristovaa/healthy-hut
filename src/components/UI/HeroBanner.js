import classes from './HeroBanner.module.scss';
import ingredientsImage from '../../assets/ingredients.jpg';

const HeroBanner = () => {
    return (
        <>
            <section className={classes['hero-container']}>
                <img src={ingredientsImage} className={classes['hero-container__img']} alt="Ingredients as a hero banner background"/>
                <h1 className={classes['hero-container__title']}>Search for a new recipe...</h1>
            </section>
        </>
    )

};

export default HeroBanner;

