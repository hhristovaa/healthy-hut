import classes from './HeroBanner.module.scss';

const HeroBanner = () => {
    return (
        <>
            <article className={classes['hero-container']}>
                <h2>Tasty and Refreshing Drinks</h2>
                <p>
                    Choose your favorite drink from our different types of bevarage
                    and enjoy a delicious and refreshing drink.
                </p>

            </article>
        </>
    )

};

export default HeroBanner;

