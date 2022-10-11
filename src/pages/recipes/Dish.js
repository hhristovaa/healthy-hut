import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import Spinner from '../../components/UI/Spinner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import { capitalizeFirstLetter } from '../../utils/utils';
import classes from './Recipes.module.scss';

const Dish = () => {
    let params = useParams();

    const getDish = (type) => client.get(`&type=${type}`);

    //low fat high protein
    //&maxFat=30&minProtein=10
    const getDishApi = useApi(getDish);

    useEffect(() => {

        getDishApi.request(params.type)

    }, [params.type]);

    let title = capitalizeFirstLetter(params.type);
    return (
        <main>
            {getDishApi.loading && <Spinner />}
            {getDishApi.error && toast.error(getDishApi.error)}
            <h1 className={classes['g-title']}>{title}</h1>
            <section className={classes['recipes__container']}>
                {getDishApi.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </main>
    )

}

export default Dish;