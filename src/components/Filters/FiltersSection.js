import classes from './FiltersSection.module.scss';
import { useState } from 'react';
import { diets, dishes, intolerances, cuisines } from '../../utils/constants';
import client from '../../apis/client';
import useApi from '../../hooks/useApi';
import Button from '../UI/Button';
import Select from 'react-select';

import { useEffect, useRef } from 'react';

const FiltersSection = () => {
  const [diet, setDiets] = useState('');
  const [dish, setDishes] = useState([]);
  const [intolerance, setIntolerances] = useState('');
  const [cuisine, setCuisines] = useState('');
  const [value, setValue] = useState('')

  const selectInputRef = useRef();

  const getFiltered = (diet = '', dish = '', intolerance = '', cuisine = '') => client.get(`&type=${dish}&diet=${diet}&intolerance=${intolerance}&cuisine=${cuisine}`)

  const getFilteredApi = useApi(getFiltered);

  const handleSelectValue = (selected) => {
    setValue(selected);
  }

  const resetFilters = () => {
    setDiets('');
    setDishes('');
    setIntolerances('');
    setCuisines('');
    setValue('')
    getFilteredApi.request();
  }

  const submitFilters = (e) => {
    e.preventDefault();
    let diets = e.target.diets.value;
    let intolerances = e.target.intolerances.value;
    let cuisines = e.target.cuisines.value;
    let disheshInput = e.target.dishes;

    const isIterable = disheshInput.length > 1;

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

    <section className={classes['filters']}>
      <form className={classes['filters__form']} onSubmit={submitFilters}>
       <fieldset className={classes['filters__form-section']} >
        <Select ref={selectInputRef} name='diets' options={diets} isClearable={true} placeholder='Select a diet' />
        <Select  ref={selectInputRef} name='dishes' options={dishes} isMulti isClearable={true} placeholder='Select a dish' />
        <Select  ref={selectInputRef} name='intolerances' options={intolerances} isClearable={true} placeholder='Select an intolerance' />
        <Select  ref={selectInputRef}  name='cuisines' options={cuisines} isClearable={true} placeholder='Select a cuisine' />
        </fieldset>
        <div className={classes['filters__actions']}>
        <Button type='submit' version='secondary'>Filter</Button>
        <Button type='button' version='danger' outline onClick={resetFilters}>Reset Filters</Button>
        </div>
      </form>
    </section>
  )
};

export default FiltersSection;