import classes from './Navbar.module.css';
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


    return (
        <header>
            <nav className='navbar'>
                <ul className='navbar-list'>
                    <li className={navbarItemClasses} onClick={() => navigate('/')}>Trending</li>
                    <li className='navbarItem' onClick={() => navigate('/recipes')}>Recipes</li>
                    <li className='navbarItem' onClick={() => navigate('/articles')}>Articles</li>
                    <li className='navbarItem' onClick={() => navigate('/contacts')}>Contacts</li>
                    <li className='navbarItem' onClick={() => navigate('/profile')}>Profile</li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;