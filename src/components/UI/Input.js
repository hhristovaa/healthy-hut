import classes from './Input.scss';
import { IonIcon } from '@ionic/react';

const Input = (props) => (
    <fieldset className='form-group'>
        {props.label && <label className='form-group__label' htmlFor={props.id}>{props.label}</label>}
        {props.multiline ? (<textarea
        id={props.id}
            value={props.value}
            className='form-group__textarea'
            placeholder={props.placeholder}
            onChange={props.onChange}></textarea>) : (<input
                type={props.type}
                value={props.value}
                id={props.id}
                className='form-group__input'
                placeholder={props.placeholder}
                onChange={props.onChange}
                accept={props.fileTypes}
                disabled={props.disabled}
                required={props.required}
            />)
        }
        {props.icon && <IonIcon icon={props.icon}/>}
    </fieldset>
);

export default Input;