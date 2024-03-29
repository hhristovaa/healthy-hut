import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import RecipeItem from '../../components/Recipes/RecipeItem';
import NoResults from '../../components/UI/NoResults';
import Spinner from '../../components/UI/Spinner';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import classes from './Recipes.module.scss';

const Specials = () => {
    const isMounted = useRef(true);

    let params = useParams();
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

    const filtered = getSpecialsApi.data?.results.filter(obj => {
        return obj.type === true;
    });

    return (
        <main>
            <h1 className={classes['g-title']}>Special Recipes</h1>
            {getSpecialsApi.loading && <Spinner />}
            {getSpecialsApi.error && toast.error(getSpecialsApi.error)}
            <section className={classes['recipes__container']}>
                {filtered?.length === 0 && <NoResults />}
                {filtered?.length !== 0 && filtered?.map((recipe) => {
                    return <RecipeItem key={recipe.id} recipe={recipe} />
                })}
            </section>
        </main>
    )
}

export default Specials;
