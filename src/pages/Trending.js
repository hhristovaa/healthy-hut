import {Link} from 'react-router-dom';

import HeroBanner from '../components/UI/HeroBanner';
import RecipeItem from '../components/Recipes/RecipeItem';

const Trending = () => {
    return (
        <>
                <HeroBanner/>

        <main>
            

    <h1>Trending</h1>
    <Link to='/recipes'>
All Recipes
    </Link>
    <RecipeItem/>
    <Link to='/articles'>
All articles
    </Link>

    </main>
    </>
    )
}

export default Trending;