import FilteredRecipes from '../../components/Recipes/FilteredRecipes';

import classes from './Recipes.module.scss';

const Recipes = () => {
    return (
        <main>
            <h1 className={classes['g-title']}>Recipes</h1>
            <FilteredRecipes />
        </main>
    )
}

export default Recipes;
