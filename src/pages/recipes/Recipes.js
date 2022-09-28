import classes from './Recipes.module.scss';
import FilteredRecipes from '../../components/Recipes/FilteredRecipes';

const Recipes = () => {
    return (
        <main>
            <h1 className={classes['g-title']}>Recipes</h1>
            <FilteredRecipes />
        </main>
    )
}

export default Recipes;
