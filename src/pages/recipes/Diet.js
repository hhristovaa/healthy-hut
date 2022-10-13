import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

import Spinner from '../../components/UI/Spinner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import client from '../../apis/client';
import { capitalizeFirstLetter } from '../../utils/utils';
import classes from './Recipes.module.scss';

const Diet = () => {
    let params = useParams();

    const getDiet = async (params) => await client.get(`&diet=${params.type}`);

    const { isLoading, isError, error, data } = useQuery(['diet', params.type], () => getDiet(params));

    let title = capitalizeFirstLetter(params.type);

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
            <h1 className={classes['g-title']}>{title}</h1>
            <section className={classes['recipes__container']}>
                {content?.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </main>
    )
}

export default Diet;