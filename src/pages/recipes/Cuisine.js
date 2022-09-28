import { useEffect } from 'react';
import RecipeItem from '../../components/Recipes/RecipeItem';
import classes from './Recipes.module.scss';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import { capitalizeFirstLetter } from '../../utils/utils';
import { useParams } from 'react-router-dom';

const Cuisine = () => {
    let params = useParams();
    const getCuisine = (type) => client.get(`&cuisine=${type}`);
    const getCuisineApi = useApi(getCuisine);

    useEffect(() => {
        getCuisineApi.request(params.type)
    }, [params.type]);

    let title = capitalizeFirstLetter(params.type);

    // let isCuisineInStorage = localStorage.getItem(params.type);

    // if (isCuisineInStorage) {
    //     let JSONcuisine = JSON.parse(isCuisineInStorage);
    //     setCuisine(JSONcuisine);
    // } else {
    //     getCuisineApi.request(params.type)
    //     setCuisine(getCuisineApi.data?.results);
    // }


    return (
        <main>
            {getCuisineApi.loading && <Spinner />}
            {getCuisineApi.error && toast.error(getCuisineApi.error)}
            <h1 className={classes['g-title']}>{title}</h1>
            <section className={classes['recipes__container']}>
                {getCuisineApi.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </main>
    )

}


export default Cuisine;
