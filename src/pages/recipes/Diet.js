import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient, queryCache } from 'react-query';

import Spinner from '../../components/UI/Spinner';
import RecipeItem from '../../components/Recipes/RecipeItem';
import useApi from '../../hooks/useApi';
import client from '../../apis/client';
import { capitalizeFirstLetter } from '../../utils/utils';
import classes from './Recipes.module.scss';

const Diet = () => {
    let params = useParams();
    const queryClient = useQueryClient();
    const apiKey = 'a3577636ccd3420a92a088027e661830';
    // const apiKey = 'b44514ae9c644024a55ec4e856cf0fd2';
    const BASE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=10&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true`;
    
    const getDiet = async (params) => await client.get(`&diet=${params.type}`);
    // const getDiet = async () => await client.get(BASE_URL, {params: {
    // 'diet': 'vegan'
    // }
    // });
    // const getDietApi = useApi(getDiet);
    const { isLoading, isError, error, data } = useQuery(['diet', params.type], () => getDiet(params));

    console.log(data);
    console.log(params.type);

    // useEffect(() => {
    //     getDietApi.request(params.type)
    // }, [params.type]);

    let title = capitalizeFirstLetter(params.type);

    let content;

    if (isLoading) {
        <Spinner />
    } else if (isError) {
        toast.error(error.message)
    } else if (data.status === 402) {
        toast.warning('No recipes are available right now. Please try again later.')
    }
    else {
        content = data;
    }

    return (
        <main>
            {/* {getDietApi.loading && <Spinner />}
            {getDietApi.error && toast.error(getDietApi.error)} */}
            <h1 className={classes['g-title']}>{title}</h1>
            <section className={classes['recipes__container']}>
                {/* {getDietApi.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })} */}

                {content?.data?.results.map((item) => {
                    return (
                        <RecipeItem key={item.id} recipe={item} />
                    )
                })}
            </section>
        </main>
    )
}

export default Diet;