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
                    <RecipeItem key={item.id} recipe={item}/>
                )
            })}
            </section>
        </main>
    )

}

export default Diet;