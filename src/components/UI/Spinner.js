import classes from './Spinner.module.scss'

const Spinner = () => {
    return (
        <div className={classes.overlay}>
    <div className={classes.spinner}><div></div><div></div></div>
    </div>
    )
}

export default Spinner;