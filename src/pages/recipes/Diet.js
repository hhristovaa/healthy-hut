import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';

const Diet = () => {

    const [diet, setDiet] = useState([]);
    let params = useParams();

    const getDiet = async (name) => {
        const apiKey = '2ed50f18cc1446178f98816f679672f1';

        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&diet=${name}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`);
        const recipes = await data.json();

        setDiet(recipes.results);

    };

    useEffect(() => {

        getDiet(params.type)
        console.log(params.type)
    }, []);

    return (
        <main>
            {diet.map((item) => {
                return (
                    <RecipeItem key={item.id} recipe={item}>
                        
                            
                    </RecipeItem>
                )
            })}
        </main>
    )

}

export default Diet;