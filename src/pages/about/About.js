import classes from './About.module.scss'
import spoonacularLogo from '../../assets/svg/spoonacular-logo.svg';

const About = () => {

    return (<main>

        <h1 className={classes['g-title']}>About</h1>
        <section className={classes.about}>
            <article className={classes['about__card']}>
                <h3>Powered By</h3>
                <img src={spoonacularLogo} alt="Spoonacular API" />
                <p>The only food API you'll ever need.</p>
            </article>
        </section>
    </main>
    );
}

export default About;