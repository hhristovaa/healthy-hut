import classes from './Checkbox.module.scss';

const Checkbox = (props) => (
    <fieldset className={classes.filter}>
        <input
            type='checkbox'
            value={props.value}
            id={props.id}
            className={classes['filter__input']}        
            onChange={props.onChange}    
            
    
        />
       <label className={classes['filter__label']} htmlFor={props.id}>{props.label}</label>

    </fieldset>
);

export default Checkbox;