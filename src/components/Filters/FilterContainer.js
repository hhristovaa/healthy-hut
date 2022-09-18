import classes from './FilterContainer.module.scss';
import Checkbox from '../UI/Checkbox';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import { capitalizeFirstLetter } from '../../utils/utils';
import Select from 'react-select'

import {diets} from '../../utils/constants';

const FilterContainer = (props) => {


    // const openFilterHandler = () => {    // const [checked, setChecked] = useState([]);
    // const [openFilter, setOpenFilter] = useState(false);
    // const ref = useRef();

    // useEffect(() => {
    //     const handleClickOutside = (e) => {
    //         let eTarget = e.target;
    //         let currRef = ref.current;

    //         if (!currRef.contains(eTarget)) {
    //             setOpenFilter(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    // }, [ref]);

    //     setOpenFilter(prevState => !prevState);
    // }

    // const handleToggle = (e) => {
    //     console.log(e.target);
    //      //const currentIndex = checked.indexOf(e.target.value);
    //      const newChecked = {...checked};

    //     // if  (currentIndex === -1) {
    //     //     newChecked.push(e.target.value);
    //     // } else {
    //     //     newChecked.splice(currentIndex, 1)
    //     // }

        

    //     setChecked(e.target.value)
    //     console.log(checked);
    //     // console.log(value.type);
        
    //     props.handleFilters(e.target.value);
    //      openFilterHandler();

    // } 

    return (
        <Select options={props.options} />

    // <article className={classes['filters__dropdown']} onClick={openFilterHandler} ref={ref}>
    //     <span className={classes['filters__dropdown-label']}>Select a {props.label}</span>
    //     <IonIcon icon={openFilter ? chevronUpOutline : chevronDownOutline}/>
    //    {openFilter &&  <ul className={classes['filters__dropdown-menu']}>
    //     {props.list.map((value, index) => (
    //     <li key={index} className={classes['filters__dropdown-menu__item']}>
    //             <Checkbox 
    //             label={capitalizeFirstLetter(value.type)}
    //             onChange={handleToggle} 
    //             value={value.type}
    //             name={props.label}      
    //             />
    //         </li>
    //     ))}
    //     </ul>}
    // </article>
)
}

export default FilterContainer;