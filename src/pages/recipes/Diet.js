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

    const [diet, setDiet] = useState([]);
    let params = useParams();

    const getDiet = (name) => client.get(`&diet=${name}`);
    const getDietApi = useApi(getDiet);

    // const getDiet = async (name) => {
    //     const apiKey = '2ed50f18cc1446178f98816f679672f1';

    //     const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&diet=${name}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`);
    //     const duration = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&maxReadyTime=30&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`);
    //     const recipes = await data.json();

    //     setDiet(recipes.results);

    // };

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
                    <RecipeItem key={item.id} recipe={item}>


                    </RecipeItem>
                )
            })}
            </section>
        </main>
    )

}

export default Diet;