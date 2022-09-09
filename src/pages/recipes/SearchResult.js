import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeItem from '../../components/Recipes/RecipeItem';
import classes from './Recipes.module.scss';

const SearchResult = () => {
    const [results, setResults] = useState([]);
    let params = useParams();

    const getSearched = async (query) => {
        const apiKey = '2ed50f18cc1446178f98816f679672f1';

        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&query=${query}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`);
        const recipes = await data.json();

        setResults(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);

    }, [params.search])

    return (
        <main>
            <h1 className={classes['g-title']}>Search Results</h1>
            <section className={classes['recipes__container']}>
                {results?.map((recipe) => {
                    return (
                        <RecipeItem key={recipe.id} recipe={recipe}>
                        </RecipeItem>
                    )
                })}
            </section>
        </main>
    )


}

export default SearchResult;