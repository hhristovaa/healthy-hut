import { useEffect, useState } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Category from '../../components/Category/Category';
import classes from './Recipes.module.scss';
import Spinner from '../../components/UI/Spinner';
import FilterContainer from '../../components/Filters/FilterContainer';

const Recipes = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    //runs fetch trending when the component is mounted
    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        //cache - there is no need to fetch recipes every time
        //store in local storage, check if there si something
        //in local storage you can save strings; JSON.
        //JSON.parse - parsing from string to array
        //JSON stringify - opposite of it

        const checkLocalStorage = localStorage.getItem('trending');
        if (checkLocalStorage) {
            let trendingRecipes = JSON.parse(checkLocalStorage);
            setTrending(trendingRecipes)
        } else {
            const apiKey = '2ed50f18cc1446178f98816f679672f1';
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`);
            const data = await api.json();
            const recipesString = JSON.stringify(data.recipes);
            localStorage.setItem('trending', recipesString);

            setTrending(data.recipes);
        }

        setLoading(false);

    };

    const handleFilters = (filters, category) => {

    }

    if (loading) {
        return <Spinner />;
    }
    return (
        <main>
  <h1 className={classes['g-title']}>Recipes</h1>
            <FilterContainer handleFilters={filters => handleFilters(filters, 'diets')} />
            <section className={classes['recipes__container']}>
                {trending.map((recipe) => {
                    return (
                        
              
                            <RecipeItem key={recipe.id} recipe={recipe}>
                            </RecipeItem>
                      
                    );

                })}

</section> 
        </main>)
}

export default Recipes;
