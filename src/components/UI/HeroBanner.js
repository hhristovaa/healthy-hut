import classes from './HeroBanner.module.scss';
import ingredientsImage from '../../assets/ingredients.jpg';
import Input from './Input';
import { useState } from 'react';

import { searchOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        navigate('/search/' + searchInput);
    }

    return (
        <>
            <section className={classes['hero-container']}>
                <img src={ingredientsImage} className={classes['hero-container__img']} alt="Ingredients as a hero banner background" />
                <h1 className={classes['hero-container__title']}>Search for a new recipe...</h1>
                <form onSubmit={submitHandler}>
                     <Input
                    type='search'
                    id='recipe-search'
                    placeholder='Search for a recipe'
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                />
               


                </form>

               
            </section>
        </>
    )

};

export default HeroBanner;

