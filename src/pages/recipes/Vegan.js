import { useEffect, useState } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import classes from './Recipes.module.scss';

const Vegan = () => {
    const [vegan, setVegan] = useState([]);
    //runs fetch trending when the component is mounted
    useEffect(() => {
        fetchVegan();
    }, []);

    const fetchVegan = async () => {
        //cache - there is no need to fetch recipes every time
        //store in local storage, check if there si something
        //in local storage you can save strings; JSON.
        //JSON.parse - parsing from string to array
        //JSON stringify - opposite of it

        const checkLocalStorage = localStorage.getItem('vegan');
        if (checkLocalStorage) {
            let veganRecipes = JSON.parse(checkLocalStorage);
            setVegan(veganRecipes)
        } else {
            const apiKey = '2ed50f18cc1446178f98816f679672f1';
            
            const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30&diet=vegan&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`);
            const data = await api.json();
            console.log(data);
            console.log(data.results);
            const recipesString = JSON.stringify(data.results);
            localStorage.setItem('vegan', recipesString);

            setVegan(data.results);
        }

    };


    return (
        <main>
            <h1>Vegan Recipes</h1>
      
      <section className={classes.recipes}>
                {vegan.map((recipe) => {
                    return (
                       
                            <RecipeItem key={recipe.id} recipe={recipe}>
                            </RecipeItem>
            
                    );
                })}
       </section>

        </main>)
}

export default Vegan;
