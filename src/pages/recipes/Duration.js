import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import classes from './Recipes.module.scss';

const Duration = () => {
    let params = useParams();

    const getDuration = (minutes) => client.get(`&maxReadyTime=${minutes}`);
    const getDurationApi = useApi(getDuration);

    useEffect(() => {
        getDurationApi.request(params.minutes)

    }, [params.minutes]);

    return (
        <main>
            {/* additional check if it is between  */}
            {console.log(getDurationApi.data?.results)}
            {getDurationApi.loading && <Spinner />}
            {getDurationApi.error && toast.error(getDurationApi.error)}
            <h1 className={classes['g-title']}>Up to {params.minutes} Minutes</h1>
            <section className={classes['recipes__container']}>
                {getDurationApi.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </main>
    )

}

export default Duration;