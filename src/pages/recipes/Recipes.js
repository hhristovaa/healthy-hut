import { useEffect, useState } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import classes from './Recipes.module.scss';
import Spinner from '../../components/UI/Spinner';
import FiltersSection from '../../components/Filters/FiltersSection';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);


    //runs fetch trending when the component is mounted
    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        //cache - there is no need to fetch recipes every time
        //store in local storage, check if there is  something
        //in local storage you can save strings; JSON.
        //JSON.parse - parsing from string to array
        //JSON stringify - opposite of it

        const checkLocalStorage = localStorage.getItem('trending');
        if (checkLocalStorage) {
            let trendingRecipes = JSON.parse(checkLocalStorage);
            setRecipes(trendingRecipes)
        } else {
            const apiKey = 'cc1ef7f275ed420782a8c869acc377dd';
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`);
            const data = await api.json();
            const recipesString = JSON.stringify(data.recipes);
            localStorage.setItem('recipes', recipesString);
            setRecipes(data.recipes);
        }

        setLoading(false);

    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            <h1 className={classes['g-title']}>Recipes</h1>
            <FiltersSection />
            <section className={classes['recipes__container']}>
                {recipes?.map((recipe) => {
                    return (
                        <RecipeItem key={recipe.id} recipe={recipe} isFavorite={recipe.favorite} />
                    );
                })}
            </section>
        </main>
        )
}

export default Recipes;
