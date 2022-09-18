import { useEffect, useState } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import classes from './Recipes.module.scss';
import Spinner from '../../components/UI/Spinner';
import FiltersSection from '../../components/Filters/FiltersSection';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Specials = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    let params = useParams();
    //runs fetch trending when the component is mounted
    const getSpecials = () => client.get();
    const getSpecialsApi = useApi(getSpecials);

    useEffect(() => {
        getSpecialsApi.request()
    }, []);

    let type = params.type;
    console.log(type);

   console.log(getSpecialsApi.data)

    {getSpecialsApi.loading && <Spinner />}
    {getSpecialsApi.error && toast.error(getSpecialsApi.error)}

    return (
        <main>
            <h1 className={classes['g-title']}>Special Recipes</h1>
            <FiltersSection />
            <section className={classes['recipes__container']}>
                {getSpecialsApi.data?.results.map((recipe) => {
                    {console.log(recipe.type ? recipe : 'no res')}
                    return recipe.type && <RecipeItem key={recipe.id} recipe={recipe} isFavorite={recipe.favorite} /> 


                   

                })}



            </section>
        </main>
    )
}

export default Specials;
