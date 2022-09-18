import classes from './FilterContainer.module.scss';
import { useState } from 'react';
import { diets, dishes, intolerances, cuisines } from '../../utils/constants';
import client from '../../apis/client';
import useApi from '../../hooks/useApi';
import Button from '../UI/Button';
import Select from 'react-select';
import { useEffect } from 'react';

const FiltersSection = () => {
  const [diet, setDiets] = useState();
  const [dish, setDishes] = useState([]);
  const [intolerance, setIntolerances] = useState();
  const [cuisine, setCuisines] = useState();

  const getFiltered = (diet = "", dish, intolerance = "", cuisine = "") => client.get(`&type=${dish}&diet=${diet}&intolerance=${intolerance}&cuisine=${cuisine}`)

  const getFilteredApi = useApi(getFiltered);

  const resetFilters = () => {
    setDiets("");
    setDishes("");
    setIntolerances("");
    setCuisines("");
    getFilteredApi.request();
  }

  const submitFilters = (e) => {
    e.preventDefault();
    let diets = e.target.diets.value;
    let intolerances = e.target.intolerances.value;
    let cuisines = e.target.cuisines.value;
    let disheshInput = e.target.dishes;
    let isIterable = disheshInput.length > 1;

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

  // useEffect(()=> {
  //   getFilteredApi.request(diet, dish, intolerance, cuisine);
  // }, [diet, dish, intolerance, cuisine])

  console.log(getFilteredApi.data);

  return (

    <section className={classes['filters__section']}>
      <form onSubmit={submitFilters}>
        <Select name='diets' options={diets} isClearable={true} placeholder='Select a diet' />
        <Select name='dishes' options={dishes} isMulti isClearable={true} placeholder='Select a dish' />
        <Select name='intolerances' options={intolerances} isClearable={true} placeholder='Select an intolerance' />
        <Select name='cuisines' options={cuisines} isClearable={true} placeholder='Select a cuisine' />
        <Button type='submit' version='primary'>Filter</Button>
        <Button type='button' version='secondary' onClick={resetFilters}>Reset Filters</Button>
      </form>
    </section>
  )
};

export default FiltersSection;