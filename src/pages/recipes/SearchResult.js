import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import client from '../../apis/client';
import useApi from '../../hooks/useApi';
import classes from './Recipes.module.scss';

const SearchResult = () => {
    let params = useParams();

    const getSearched = (query) => client.get(`&query=${query}`);

    const getSearchedApi = useApi(getSearched);

    useEffect(() => {
        getSearchedApi.request(params.search);
    }, [params.search])

    return (
        <main>
            <h1 className={classes['g-title']}>Search Results</h1>

            {getSearchedApi.loading && <Spinner />}
            {getSearchedApi.error && toast.error(getSearchedApi.error)}

            <section className={classes['recipes__container']}>
                {getSearchedApi.data?.results.map((recipe) => {
                    return (
                        <RecipeItem key={recipe.id} recipe={recipe}/>
                    )
                })};

            </section>
        </main>
    )
}

export default SearchResult;