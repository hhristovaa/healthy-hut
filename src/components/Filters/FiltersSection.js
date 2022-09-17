import classes from './FilterContainer.module.scss';
import FilterContainer from './FilterContainer';
import { useState } from 'react';
import { diets, dishes, intolerances, cuisines } from '../../utils/constants';
import client from '../../apis/client';
import useApi from '../../hooks/useApi';
import Button from '../UI/Button';

const FiltersSection = () => {
    const [filters, setFilters] = useState({
        diets: [],
        dishes: [],
        intolerances: [],
        cuisines: [],
    });

    const showFilteredResults = (filters) => {
        getFiltered(filters);

    }


    const getFilteredRecipes = (filters) => {

    }

    const getFiltered = (filters) => client.get(`&type=${filters.dishes}&diet=${filters.diets}&intolerance=${filters.intolerances}&cuisine=${filters.cuisines}`)

    const getFilteredApi = useApi(getFiltered);


    const handleFilters = (filters, category) => {
        const newFilters = { ...filters };
        console.log(newFilters);
        console.log(newFilters[category]);

        newFilters[category] = filters;

        getFiltered(newFilters);
        setFilters(newFilters);
        getFilteredApi.request(newFilters);


    }

    const submitFilters = () => {
        
    }

    return (



        <section className={classes['filters__section']}>
            <FilterContainer handleFilters={filters => handleFilters(filters, 'diets')} list={diets} label='diet' />
            <FilterContainer handleFilters={filters => handleFilters(filters, 'dishes')} list={dishes} label='dish' />
            <FilterContainer handleFilters={filters => handleFilters(filters, 'intolerances')} list={intolerances} label='intolerance' />
            <FilterContainer handleFilters={filters => handleFilters(filters, 'cuisines')} list={cuisines} label='cuisine' />
            <Button type='submit' version='primary' onSubmit={submitFilters}>Filter</Button>
        </section>
    )
};

export default FiltersSection;