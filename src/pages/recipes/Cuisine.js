import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

import RecipeItem from '../../components/Recipes/RecipeItem';
import Spinner from '../../components/UI/Spinner';
import client from '../../apis/client';
import { capitalizeFirstLetter } from '../../utils/utils';
import classes from './Recipes.module.scss';
import NoResults from '../../components/UI/NoResults';

const Cuisine = () => {
    let params = useParams();
    const getCuisine = async (params) => await client.get(`&cuisine=${params.type}`);

    const { isLoading, isError, error, data } = useQuery(['cuisine', params.type], () => getCuisine(params));

    let title = capitalizeFirstLetter(params.type);

    let allCuisines;

    if (isLoading) {
        return <Spinner />
    } else if (isError) {
        return toast.error(error.message)
    } else {
       data?.data?.results.every(obj => {
            allCuisines = obj.cuisines.map(el => {
                console.log(el);
                if ((el.toLowerCase()).includes(params.type) && obj.length !== 0) {
                    console.log(obj.length)
                    return obj;
                } 
            });
        });
    }
 
    console.dir(allCuisines);
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 2
            }}
        >
            <h1 className={classes['g-title']}>{title}</h1>
            <section className={classes['recipes__container']}>

                {allCuisines.length !== 0 && allCuisines.map((item) => {
                if (item) {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                }
                })}
            </section>
        </motion.main>
    )

}


export default Cuisine;
