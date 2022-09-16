import { useEffect, useState } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Category from '../../components/Category/Category';
import classes from './Recipes.module.scss';
import Spinner from '../../components/UI/Spinner';
import FilterContainer from '../../components/Filters/FilterContainer';
import { diets, dishes, intolerances, cuisines } from '../../utils/constants';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import { useContext } from 'react';

const Recipes = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        diets: [],
        dishes: [],
        intolerances: [],
        cuisines: [],
    });


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
    const showFilteredResults = (filters) => {
        getFiltered(filters);

    }


    const getFilteredRecipes = (filters) => {

    }

    const getFiltered = (filters) => client.get(`&type=${filters.dishes}&diet=${filters.diets}&intolerance=${filters.intolerances}&cuisine=${filters.cuisines}`)

const getFilteredApi = useApi(getFiltered);


    const handleFilters = (filters, category) => {
        const newFilters = { ...filters };
        newFilters[category] = filters;

        getFiltered(newFilters);
        setFilters(newFilters);
        getFilteredApi.request(newFilters);

        console.log(filters)

    }



    if (loading) {
        return <Spinner />;
    }
    return (
        <main>
            <h1 className={classes['g-title']}>Recipes</h1>
            <section className={classes['recipes__filter']}>
                <FilterContainer handleFilters={filters => handleFilters(filters, 'diets')} list={diets} label='diet' />
                <FilterContainer handleFilters={filters => handleFilters(filters, 'dishes')} list={dishes} label='dish' />
                <FilterContainer handleFilters={filters => handleFilters(filters, 'intolerances')} list={intolerances} label='intolerance' />
                <FilterContainer handleFilters={filters => handleFilters(filters, 'cuisines')} list={cuisines} label='cuisine' />

            </section>

            <section className={classes['recipes__container']}>
                {trending.map((recipe) => {
                    return (
                        <RecipeItem key={recipe.id} recipe={recipe} isFavorite={recipe.favorite} />

                    );

                })}

            </section>
        </main>)
}

export default Recipes;
