import classes from './FilterContainer.module.scss';
import Checkbox from '../UI/Checkbox';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

const FilterContainer = (props) => {
    const [checked, setChecked] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const ref = useRef();

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


    const openFilterHandler = () => {
        setOpenFilter(prevState => !prevState);
    }

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked);
        openFilterHandler();

    }

    return (

        <article className={classes['filters__dropdown']} onClick={openFilterHandler} ref={ref}>
            <span className={classes['filters__dropdown-label']}>Select a {props.label}</span>
            <IonIcon icon={openFilter ? chevronUpOutline : chevronDownOutline} />
            {openFilter && <ul className={classes['filters__dropdown-menu']}>
                {props.list.map((value, index) => (
                    <li key={index} className={classes['filters__dropdown-menu__item']}>
                        <Checkbox
                            label={value.type}
                            onChange={() => handleToggle(value.type)}
                            value={value.type}
                        />

                    </li>
                ))}
            </ul>}
        </article>
    )
}

export default FilterContainer;