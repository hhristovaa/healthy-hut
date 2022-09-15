import classes from './FilterContainer.module.scss';
import Checkbox from '../UI/Checkbox';
import React from 'react';
import { useState } from 'react';

const diets = [
    {
        'id': 1,
        'type': 'vegan'

    },
    {
        'id': 2,
        'type': 'vegetarian'

    },
    {
        'id': 3,
        'type': 'ketogenic'

    },
    {
        'id': 4,
        'type': 'gluten-free'

    },
    {
        'id': 5,
        'type': 'dairy-free'

    },
    {
        'id': 6,
        'type': 'paleo'

    }
];



const FilterContainer = (props) => {
    const [checked, setChecked] = useState([]);


    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if  (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked);


    } 

    return (
    
    <section>
        {diets.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox label={value.type}
                onChange={() => handleToggle(value.id)} />
            </React.Fragment>
        ))}
    </section>
)
}

export default FilterContainer;