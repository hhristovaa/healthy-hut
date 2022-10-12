import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';


import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import client from '../../apis/client';
import classes from './Recipes.module.scss';

const SearchResult = () => {
    let params = useParams();

    const getSearched = (params) => client.get(`&query=${params.search}`);

    const { isLoading, isError, error, data } = useQuery(['searched', params.search], () => getSearched(params));

    let content;

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return toast.error(error.message)
    } else {
        content = data;
    }

    return (
        <main>
            <h1 className={classes['g-title']}>Search Results</h1>     
            <section className={classes['recipes__container']}>
                {content?.data?.results.map((recipe) => {
                    return (
                        <RecipeItem key={recipe.id} recipe={recipe}/>
                    )
                })};

            </section>
        </main>
    )
}

export default SearchResult;