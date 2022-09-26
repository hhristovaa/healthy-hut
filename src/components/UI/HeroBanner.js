import classes from './HeroBanner.module.scss';
import ingredientsImage from '../../assets/ingredients.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/search/' + searchInput);
    }

    return (
        <section className={classes['hero-container']}>
            <img src={ingredientsImage} className={classes['hero-container__img']} alt="Ingredients as a hero banner background" />
            <form onSubmit={submitHandler} className={classes.search}>
                <label className={classes['hero-container__title']} htmlFor='recipe-search'>Search for a new recipe...</label>
                <input
                    type='search'
                    id='recipe-search'
                    className={classes['search__input']}
                    placeholder='Search for a recipe'
                    value={searchInput} onChange={(e) => setSearchInput(e.target.value)}

                />
            </form>
        </section>
    )

};

export default HeroBanner;

