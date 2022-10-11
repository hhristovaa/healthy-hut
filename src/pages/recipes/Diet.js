import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Spinner from '../../components/UI/Spinner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import { capitalizeFirstLetter } from '../../utils/utils';
import classes from './Recipes.module.scss';

const Diet = () => {
    let params = useParams();

    const getDiet = (name) => client.get(`&diet=${name}`);
    const getDietApi = useApi(getDiet);

    useEffect(() => {
        getDietApi.request(params.type)
    }, [params.type]);

    let title = capitalizeFirstLetter(params.type);

    return (
        <main>
            {getDietApi.loading && <Spinner />}
            {getDietApi.error && toast.error(getDietApi.error)}
            <h1 className={classes['g-title']}>{title}</h1>
            <section className={classes['recipes__container']}>
                {getDietApi.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </main>
    )
}

export default Diet;