import classes from './Input.scss';

const Input = ({ multiline, id, value, label, placeholder, disabled, type, fileTypes, onChange }) => (
    <fieldset className='form-group'>
        {label && <label className='form-group__label' htmlFor={id}>{label}</label>}
        {multiline ? (<textarea
        id={id}
            value={value}
            className='form-group__textarea'
            placeholder={placeholder}
            onChange={onChange}></textarea>) : (<input
                type={type}
                value={value}
                id={id}
                className='form-group__input'
                placeholder={placeholder}
                onChange={onChange}
                accept={fileTypes}
                disabled={disabled}
            />)
        }
    </fieldset>
);

export default Input;