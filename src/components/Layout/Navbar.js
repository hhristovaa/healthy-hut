import classes from './Navbar.module.scss';
import { NavLink, Link } from 'react-router-dom';



const Navbar = () => {
    const isLinkActive = (({ isActive }) => (isActive ? `${classes['navbar__item']} ${classes['is-active']}` : classes['navbar__item']));

    return (
        <header className={classes.header}>
            <Link to='/' className={classes.logo}>HealthyHut</Link>

            <nav className={classes.navbar}>  
                    <NavLink className={isLinkActive} to={'/'}>Home</NavLink>
                    <NavLink className={isLinkActive} to={'/recipes'}>Recipes
                    
                    </NavLink>
                    <div className={classes.submenu}>
                        <NavLink as='li' to={'/recipes/vegan'}> Vegan </NavLink>
                    </div>
                    <NavLink className={isLinkActive} to={'/articles'}>Articles</NavLink>
                    <NavLink className={isLinkActive} to={'/contacts'}>Contacts</NavLink>
                    <NavLink className={isLinkActive} to={'/profile'}>Profile</NavLink>                       
            </nav>

        </header>
    )
}

export default Navbar;