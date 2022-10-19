import FilteredRecipes from '../../components/Recipes/FilteredRecipes';

import classes from './Recipes.module.scss';
import { motion } from "framer-motion";

const Recipes = () => {
    return (
        <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
            <h1 className={classes['g-title']}>Recipes</h1>
            <FilteredRecipes />
        </motion.main>
    )
}

export default Recipes;
