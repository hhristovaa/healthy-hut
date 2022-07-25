import classes from './Navbar.module.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }

    }
    const navbarItemClasses = `${classes['navbar__item']} ${pathMatchRoute('/recipes') ? classes['is-active'] : ''}`;
    const isLinkActive = (({ isActive }) => (isActive ? classes['is-active'] : ""));


    return (
        <header className={classes.header}>
            <Link to='/' className={classes.logo}>HealthyHut</Link>

            <nav>
                <ul className={classes.navbar}>
                    <li className={navbarItemClasses} onClick={() => navigate('/')}>Home</li>
                    <li className={navbarItemClasses} onClick={() => navigate('/recipes')}>Recipes</li>
                    <li className={navbarItemClasses} onClick={() => navigate('/articles')}>Articles</li>
                    <li className={navbarItemClasses} onClick={() => navigate('/contacts')}>Contacts</li>
                    <li className={navbarItemClasses} onClick={() => navigate('/profile')}>Profile</li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;