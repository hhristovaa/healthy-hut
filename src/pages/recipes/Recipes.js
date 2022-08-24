import { useEffect, useState } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';

const Recipes = () => {
    const [trending, setTrending] = useState([]);
    //runs fetch trending when the component is mounted
    useEffect(() => {
        fetchTrending();
    }, []);
    
    const fetchTrending = async () => {
        const apiKey = '2ed50f18cc1446178f98816f679672f1';
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`);
        const data = await api.json();
        console.log(data);
        setTrending(data.recipes);


    };


    return (
        <main>
            <h1>Recipes</h1>
            {trending.map((recipe) =>{
                return(
                    <div key={recipe.id}>
                        <p>{recipe.title}</p>
                    </div>
                );

            })}

        </main>)
}

export default Recipes;
