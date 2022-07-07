import classes from './Navbar.module.scss';
import {useNavigate, useLocation} from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }
        
    }
    const navbarItemClasses = `${classes.navbarItem} ${pathMatchRoute('/') ? classes.active : ''}`;
    const isLinkActive = (({ isActive }) => (isActive ? classes.active : ""));


    return (
        <header>
            <nav className='navbar'>
                <ul className={classes.navbarList}>
                    <li className={navbarItemClasses} onClick={() => navigate('/')}>Trending</li>
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