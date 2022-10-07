import classes from './NoResults.module.scss'

const NoResults = () => {
    return (
        <div className={classes['no-results']}>
            <p>No results found</p>
        </div>
    )
}

export default NoResults;