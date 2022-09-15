import classes from './Checkbox.module.scss';

const Checkbox = (props) => (
    <fieldset className='filter'>
       <label className='filter_label' htmlFor={props.id}>{props.label}</label>
        <input
            type='checkbox'
            value={props.value}
            id={props.id}
            className='filter__input'        
            onChange={props.onChange}       
        />

    </fieldset>
);

export default Checkbox;