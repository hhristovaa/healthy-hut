import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

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
        <main>
            <h1 className={classes['g-title']}>Up to 30 Minutes</h1>
            <section className={classes['recipes__container']}>
                {content.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </main>
    )
}

export default Duration;