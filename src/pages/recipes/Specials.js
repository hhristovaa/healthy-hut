import { useEffect, useRef } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import classes from './Recipes.module.scss';
import Spinner from '../../components/UI/Spinner';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Specials = () => {
    const isMounted = useRef(true);

    let params = useParams();
    //runs fetch trending when the component is mounted
    const getSpecials = () => client.get();
    const getSpecialsApi = useApi(getSpecials);

    useEffect(() => {
        if (isMounted) {
            getSpecialsApi.request(params.type)
        }
        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);

    let type = params.type;
    console.log(type)

    const filtered = getSpecialsApi.data?.results.filter(obj => {
        console.log(obj.veryHealthy)
        return obj.type === true;
    });

    return (
        <main>
            <h1 className={classes['g-title']}>Special Recipes</h1>
            {getSpecialsApi.loading && <Spinner />}
            {getSpecialsApi.error && toast.error(getSpecialsApi.error)}
            <section className={classes['recipes__container']}>
                {filtered?.length === 0 && <div className={classes['no-results']}><p>No results found</p></div>}
                {filtered?.length !== 0 && filtered?.map((recipe) => {
                    return <RecipeItem key={recipe.id} recipe={recipe} />
                })}
            </section>
        </main>
    )
}

export default Specials;
