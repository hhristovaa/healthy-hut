import { motion } from 'framer-motion';

import classes from './About.module.scss'
import spoonacularLogo from '../../assets/svg/spoonacular-logo.svg';

const About = () => {

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            <h1 className={classes['g-title']}>About</h1>
            <section className={classes.about}>
                <article className={classes['about__card']}>
                    <h3>Powered By</h3>
                    <img src={spoonacularLogo} alt="Spoonacular API" />
                    <p>The only food API you'll ever need.</p>
                </article>
            </section>
        </motion.main>
    );
}

export default About;