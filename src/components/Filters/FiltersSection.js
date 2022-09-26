import classes from './FiltersSection.module.scss';
import { useState, createContext, useContext } from 'react';
import { diets, dishes, intolerances, cuisines } from '../../utils/constants';
import client from '../../apis/client';
import useApi from '../../hooks/useApi';
import Button from '../UI/Button';
import Select from 'react-select';
import FiltersContext from '../../context/FiltersContext';

const FiltersSection = (props) => {
  const [diet, setDiets] = useState('');
  const [dish, setDishes] = useState([]);
  const [intolerance, setIntolerances] = useState('');
  const [cuisine, setCuisines] = useState('');

const filtersCtx = useContext(FiltersContext);
const filterRecipes = filters => {
  filtersCtx.filterHandler({...filters})
}
  const getFiltered = (diet, dish, intolerance, cuisine) => client.get(`&type=${dish}&diet=${diet}&intolerance=${intolerance}&cuisine=${cuisine}`)

  const getFilteredApi = useApi(getFiltered);

  const resetFilters = () => {
    setDiets('');
    setDishes('');
    setIntolerances('');
    setCuisines('');
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

    if (isDietEmpty && isIntoleranceEmpty && isCuisineEmpty && isDishEmpty) return;

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
filterRecipes(diet, dish, intolerance, cuisine)
  }

  // useEffect(()=> {
  //   getFilteredApi.request(diet, dish, intolerance, cuisine);
  // }, [diet, dish, intolerance, cuisine])
  console.log(getFilteredApi.data?.results)
  console.log()

  return (
    <FiltersContext.Provider value={props.recipes}>
    <section className={classes['filters']}>
      <form className={classes['filters__form']} onSubmit={submitFilters}>
        <fieldset className={classes['filters__form-section']} >
          <Select name='diets' options={diets} isClearable={true} placeholder='Select a diet' />
          <Select name='dishes' options={dishes} isMulti isClearable={true} placeholder='Select a dish' />
          <Select name='intolerances' options={intolerances} isClearable={true} placeholder='Select an intolerance' />
          <Select name='cuisines' options={cuisines} isClearable={true} placeholder='Select a cuisine' />
        </fieldset>
        <div className={classes['filters__actions']}>
          <Button type='submit' version='secondary'>Filter</Button>
          <Button type='button' version='danger' outline onClick={resetFilters}>Reset Filters</Button>
        </div>
      </form>
    </section>
    </FiltersContext.Provider>
  )
};

export default FiltersSection;