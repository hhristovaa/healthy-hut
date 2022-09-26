import classes from './Button.scss';

const Button = (props) => {
    const isOutline = props.outline ? `btn btn-outline btn-outline--${props.version}` : `btn btn--${props.version}`;
    return (
        <button
            type={props.type}
            disabled={props.isDisabled}
            className={isOutline}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;
