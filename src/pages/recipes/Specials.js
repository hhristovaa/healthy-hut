import { useEffect, useState, useRef } from 'react';
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

    // for (let rec of arrRecipes) {
    //     const hasObjType = Object.hasOwn(rec, type)

    //     console.log(rec);
    //     console.log(hasObjType)
    //     if (hasObjType) {
    //         console.log(rec[type])
    //         if (rec.type) {
    //             console.log(rec.type)
    //             console.log('eho');
    //         }


    //     }
    // }

    { getSpecialsApi.loading && <Spinner /> }
    { getSpecialsApi.error && toast.error(getSpecialsApi.error) }

    return (
        <main>
            <h1 className={classes['g-title']}>Special Recipes</h1>
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
