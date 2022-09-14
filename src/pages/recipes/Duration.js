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

    const [diet, setDiet] = useState([]);
    let params = useParams();

    const getDuration = (minutes) => client.get(`&maxReadyTime=${minutes}`);
    const getDurationApi = useApi(getDuration);

    // const getDiet = async (name) => {
    //     const apiKey = '2ed50f18cc1446178f98816f679672f1';

    //     const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&diet=${name}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`);
    //     const duration = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&maxReadyTime=30&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`);
    //     const recipes = await data.json();

    //     setDiet(recipes.results);

    // };

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
                    <RecipeItem key={item.id} recipe={item}>


                    </RecipeItem>
                )
            })}
            </section>
        </main>
    )

}

export default Duration;