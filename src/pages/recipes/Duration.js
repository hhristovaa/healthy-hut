import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import client from '../../apis/client';
import classes from './Recipes.module.scss';

const Duration = () => {

    const getDuration = () => client.get(`&maxReadyTime=${30}`);

    const { isLoading, isError, error, data } = useQuery('duration', getDuration);

    let content;

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return toast.error(error.message)
    } else {
        content = data;
    }

    return (
        <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
    >
            <h1 className={classes['g-title']}>Up to 30 Minutes</h1>
        <main>
            {getDurationApi.loading && <Spinner />}
            {getDurationApi.error && toast.error(getDurationApi.error)}
            <h1 className={classes['g-title']}>Up to {params.minutes} Minutes</h1>
            <section className={classes['recipes__container']}>
                {content.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </motion.main>
    )
}

export default Duration;