import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { DIETS, DISHES, INTOLERANCES, CUISINES } from '../../utils/constants';
import client from '../../apis/client';
import useApi from '../../hooks/useApi';
import RecipeItem from './RecipeItem';
import NoResults from '../UI/NoResults';
import Spinner from '../UI/Spinner';
import Button from '../UI/Button';
import classes from './FilteredRecipes.module.scss';

const FilteredRecipes = () => {
  const [diet, setDiets] = useState('');
  const [dish, setDishes] = useState([]);
  const [intolerance, setIntolerances] = useState('');
  const [cuisine, setCuisines] = useState('');

  const dietSelectInputRef = useRef();
  const dishSelectInputRef = useRef();
  const intoleranceSelectInputRef = useRef();
  const cuisineSelectInputRef = useRef();

  const getFiltered = (diet, dish, intolerance, cuisine) => client.get(`&type=${dish}&diet=${diet}&intolerance=${intolerance}&cuisine=${cuisine}`)

  const getFilteredApi = useApi(getFiltered);

  const resetFilters = () => {
    const isDietEmpty = diet.length === 0;
    const isIntoleranceEmpty = intolerance.length === 0;
    const isCuisineEmpty = cuisine.length === 0;
    const isDishEmpty = dish.length === 0;

    if (isDietEmpty && isIntoleranceEmpty && isCuisineEmpty && isDishEmpty) return;

    setDiets('');
    setDishes('');
    setIntolerances('');
    setCuisines('');
    dietSelectInputRef.current.clearValue();
    dishSelectInputRef.current.clearValue();
    intoleranceSelectInputRef.current.clearValue();
    cuisineSelectInputRef.current.clearValue();

    getFilteredApi.request();
  }

  const submitFilters = (e) => {
    e.preventDefault();
    let diets = e.target.diets.value;
    let intolerances = e.target.intolerances.value;
    let cuisines = e.target.cuisines.value;
    let disheshInput = e.target.dishes;

    const isDietEmpty = diets.length === 0;
    const isIntoleranceEmpty = intolerances.length === 0;
    const isCuisineEmpty = cuisines.length === 0;
    const isDishEmpty = disheshInput.value.length === 0;

    const isIterable = disheshInput.length > 1;

    if (isDietEmpty && isIntoleranceEmpty && isCuisineEmpty && isDishEmpty) {
      toast.warning('Filter criteria cannot be empty.');
      return;
    }

    if (isIterable) {
      let dishVals = [...disheshInput];
      let arrDishes = [];

      for (const inputField of dishVals.values()) {
        arrDishes.push(inputField.value);
      }
      setDishes(arrDishes);
    } else {
      setDishes(disheshInput.value);
    }

    setDiets(diets);
    setIntolerances(intolerances);
    setCuisines(cuisines);
    getFilteredApi.request(diet, dish, intolerance, cuisine);
  }

  useEffect(() => {
    const controller = new AbortController();
    getFilteredApi.request(diet, dish, intolerance, cuisine);

    return () => controller.abort();
  }, [diet, dish, intolerance, cuisine])


  return (
    <>
      <section className={classes['filters']}>
        <form className={classes['filters__form']} onSubmit={submitFilters}>
          <fieldset className={classes['filters__form-section']} >
            <Select ref={dietSelectInputRef} name='diets' options={DIETS} isClearable={true} placeholder='Select a diet' />
            <Select ref={dishSelectInputRef} name='dishes' options={DISHES} isMulti isClearable={true} placeholder='Select a dish' />
            <Select ref={cuisineSelectInputRef} name='cuisines' options={CUISINES} isClearable={true} placeholder='Select a cuisine' />
            <Select ref={intoleranceSelectInputRef} name='intolerances' options={INTOLERANCES} isClearable={true} placeholder='Select an intolerance' />
          </fieldset>
          <div className={classes['filters__actions']}>
            <Button type='submit' version='secondary'>Filter</Button>
            <Button type='button' version='danger' outline onClick={resetFilters}>Reset Filters</Button>
          </div>
        </form>
      </section>
      {getFilteredApi.loading && <Spinner />}
      {getFilteredApi.error && toast.error(getFilteredApi.error)}
      <section className={classes['recipes__container']}>
        {getFilteredApi.data?.results?.length === 0 && <NoResults/>}
        {getFilteredApi.data?.results?.length !== 0 && getFilteredApi.data?.results.map((filtered) => {
          return (
            <RecipeItem key={filtered.id} recipe={filtered} />
          );

        })}
      </section>
    </>
  )
};

export default FilteredRecipes;