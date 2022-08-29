import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FullRecipe = () => {
    let params = useParams();
    const [details, setDetails] = useState({});

    const getDetails = async () => {
        const apiKey = '2ed50f18cc1446178f98816f679672f1';

        const data = await fetch(`https://api.spoonacular.com/recipes/${params.recipeId}/information?includeNutrition=true&apiKey=${apiKey}`);
        const detailData = await data.json();
        console.log(detailData);
        setDetails(detailData);
    }

    useEffect(() => {
        getDetails();
    }, [params.recipeId]);

    // const ingredients = details.extendedIngredients.forEach(ingredient => {
    //     for (let key in ingredient) {
    //         console.log(`${key}: ${ingredient[key]}`);
    //     }
    // });

    // let dishTypes = [];
    // details.dishTypes.forEach(type => {
    //     dishTypes.push(type);
    // })



    return (
        <main>
            <h1>Full Recipe</h1>
            <h3>{details.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>




            <p>{details.servings} Servings</p>
            <p>{details.readyInMinutes} Minutes</p>
            <img src={details.image} alt="" />

            <ul>
                {details.extendedIngredients?.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>

<br />
            <ul>
                {details.dishTypes?.map((type) => (
                    <li key={type.id}>{type}</li>
                ))}
            </ul>

            <br />
            <div dangerouslySetInnerHTML={{ __html: details.instructions }}></div>
        </main>
    )

}

export default FullRecipe;