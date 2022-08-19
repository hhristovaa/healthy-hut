import classes from './Button.scss';

export default function Button ({children, version, type, isDisabled, onClick}) { 
    return(
        <button type={type} disabled={isDisabled} className={`btn btn--${version}`} onClick={onClick}>
            {children}
        </button>
    );
}

