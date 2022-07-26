import classes from './Card.module.scss';

const Card = (props, className)=> {
    return (
        <div className={`${classes.card} ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Card;