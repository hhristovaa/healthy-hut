import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import client from '../../apis/client';
import classes from './Recipes.module.scss';
import NoResults from '../../components/UI/NoResults';

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
    console.log(content?.data?.results.length);
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
        >
            <h1 className={classes['g-title']}>Search Results</h1>
            <section className={classes['recipes__container']}>
                {content?.data?.results.length !== 0 && content?.data?.results.map((recipe) => {
                    return (
                        <RecipeItem key={recipe.id} recipe={recipe} />
                    )
                })};
                {content?.data?.results.length === 0 && <NoResults />}
            </section>
        </motion.main>
    )
}

export default SearchResult;