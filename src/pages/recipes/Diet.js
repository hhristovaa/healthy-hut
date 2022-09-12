import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';

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

    return (
        <main>
            {getDietApi.loading && <Spinner />}
            {getDietApi.error && toast.error(getDietApi.error)}

            {getDietApi.data?.results.map((item) => {
                return (
                    <RecipeItem key={item.id} recipe={item}>


                    </RecipeItem>
                )
            })}
        </main>
    )

}

export default Diet;