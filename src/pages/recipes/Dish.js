import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import classes from './Recipes.module.scss';
import { capitalizeFirstLetter } from '../../utils/utils';
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
                    <RecipeItem key={item.id} recipe={item}>


                    </RecipeItem>
                )
            })}
            </section>
        </main>
    )

}

export default Dish;