import classes from './Button.scss';

const Button = (props) => { 
    return(
        <button type={props.type} disabled={props.isDisabled} className={`btn btn--${props.version}`} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;
