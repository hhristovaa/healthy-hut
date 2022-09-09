import classes from './Navbar.module.scss';
import { NavLink, Link } from 'react-router-dom';
import Button from '../UI/Button';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import HeaderFavIcon from './HeaderFavIcon';
import FavoritesProvider from '../../store/FavoritesProvider';



const Navbar = () => {
    const { loggedIn, loadingStatus } = useAuthStatus();

    const isLinkActive = (({ isActive }) => (isActive ? `${classes['navbar__item']} ${classes['is-active']}` : classes['navbar__item']));

    return (
        <header className={classes.header}>
            <Link to='/' className={classes.logo}>HealthyHut</Link>

            <nav className={classes.navbar}>
                <NavLink className={isLinkActive} to={'/'}>Home</NavLink>
                <span className={classes['dropdown-menu']}><NavLink className={isLinkActive} to={'/recipes'}>Recipes
                </NavLink>

                    <div className={classes.submenu}>
                        <div className={classes['submenu__section']}>
                            <p>Dish Type</p>
                            <NavLink to={'/diet/vegan'}> Breakfast </NavLink>
                            <NavLink to={'/diet/vegan'}> Salad </NavLink>
                            <NavLink to={'/diet/vegetarian'}> Main Course </NavLink>
                            <NavLink to={'/diet/ketogenic'}> Soup </NavLink>
                            <NavLink to={'/diet/gluten-free'}> Appetizer </NavLink>
                            <NavLink to={'/diet/dairy-free'}> Dessert </NavLink>
                            <NavLink to={'/diet/dairy-free'}> Drinks </NavLink>
                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Diet Type</p>
                            <NavLink to={'/diet/vegan'}> Vegan </NavLink>
                            <NavLink to={'/diet/vegetarian'}> Vegetarian </NavLink>
                            <NavLink to={'/diet/ketogenic'}> Keto </NavLink>
                            <NavLink to={'/diet/gluten-free'}> Gluten Free </NavLink>
                            <NavLink to={'/diet/dairy-free'}> Dairy Free </NavLink>
                            <NavLink to={'/diet/fodmap-friendly'}> Low Fodmap</NavLink>
                            <NavLink to={'/diet/primal'}> Primal</NavLink>
                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Duration</p>
                            <NavLink to={'/diet/vegan'}> Up to 30 Minutes </NavLink>
                            <NavLink to={'/diet/vegetarian'}> Up to 60 Minutes </NavLink>
                            <NavLink to={'/diet/ketogenic'}> 90- Minutes </NavLink>

                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Special Recipes</p>
                            <NavLink to={'/diet/vegan'}> Budget Recipies </NavLink>
                            <NavLink to={'/diet/vegetarian'}> Super Healthy Recipes </NavLink>
                            <NavLink to={'/diet/ketogenic'}> Sustainable Recipes </NavLink>

                        </div>


                    </div>
                </span>
                <NavLink className={isLinkActive} to={'/articles'}>Articles</NavLink>
                <NavLink className={isLinkActive} to={'/contacts'}>Contacts</NavLink>
                <NavLink className={isLinkActive} to={'/profile'}>Profile</NavLink>

            </nav>
            {loggedIn ? (

                <NavLink to={'/favorites'}>    <HeaderFavIcon></HeaderFavIcon></NavLink>
            ) : (
                <div className={classes['header__action']}>
                    <Button type='button' version='secondary' outline><NavLink to={'/sign-up'}>Sign Up</NavLink>  </Button>
                    <Button type='button' version='logged' outline><NavLink to={'/sign-in'}>Log In</NavLink>  </Button>
                </div>
            )
            }

        </header>
    )
}

export default Navbar;