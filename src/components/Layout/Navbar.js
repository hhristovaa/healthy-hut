import classes from './Navbar.module.scss';
import { NavLink, Link } from 'react-router-dom';
import Button from '../UI/Button';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import HeaderFavIcon from './HeaderFavIcon';
import { IonIcon } from '@ionic/react';
import { menuOutline, closeOutline } from 'ionicons/icons';
import { useState, useRef } from 'react';

const Navbar = () => {
    const { loggedIn, loadingStatus } = useAuthStatus();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const isLinkActive = (({ isActive }) => (isActive ? `${classes['navbar__item']} ${classes['is-active']}` : classes['navbar__item']));
    const isMenuMobile = isMobile ? `${classes.header} ${classes['is-mobile']} ${classes['is-open']}` : classes.header;

    const isMenuOpen = isOpen ? `${classes.header} ${classes['is-mobile']} ${classes['is-open']}` : `${classes.header} ${classes['is-mobile']}`;

    return (
        <header className={isMenuMobile}>
            <Link to='/' className={classes.logo}>HealthyHut</Link>

            <nav className={classes.navbar}>
                <NavLink className={isLinkActive} to={'/'}>Home</NavLink>
                <span className={classes['dropdown-menu']}><NavLink className={isLinkActive} to={'/recipes'}>Recipes
                </NavLink>

                    <div className={classes.submenu}>
                        <div className={classes['submenu__section']}>
                            <p>Dish Type</p>
                            <NavLink to={'/dish/breakfast'}> Breakfast </NavLink>
                            <NavLink to={'/dish/lunch'}> Lunch </NavLink>
                            <NavLink to={'/dish/salad'}> Salad </NavLink>
                            <NavLink to={'/dish/soup'}> Soup </NavLink>
                            <NavLink to={'/dish/appetizer'}> Appetizer </NavLink>
                            <NavLink to={'/dish/dinner'}> Dinner </NavLink>
                            <NavLink to={'/dish/dessert'}> Dessert </NavLink>
                            <NavLink to={'/dish/drink'}> Drinks </NavLink>
                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Diet Type</p>
                            <NavLink to={'/diet/vegan'}> Vegan </NavLink>
                            <NavLink to={'/diet/vegetarian'}> Vegetarian </NavLink>
                            <NavLink to={'/diet/ketogenic'}> Keto </NavLink>
                            <NavLink to={'/diet/gluten-free'}> Gluten Free </NavLink>
                            <NavLink to={'/diet/dairy-free'}> Dairy Free </NavLink>
                            <NavLink to={'/diet/fodmap-friendly'}> Low Fodmap</NavLink>
                            <NavLink to={'/diet/paleo'}> Paleo</NavLink>
                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Cuisine</p>
                            <NavLink to={'/cuisine/american'}> American </NavLink>
                            <NavLink to={'/cuisine/british'}> British </NavLink>
                            <NavLink to={'/cuisine/chinese'}> Chinese </NavLink>
                            <NavLink to={'/cuisine/european'}> European </NavLink>
                            <NavLink to={'/cuisine/mediterranean'}> Mediterranean </NavLink>
                            <NavLink to={'/cuisine/greek'}> Greek</NavLink>
                            <NavLink to={'/cuisine/italian'}> Italian</NavLink>
                            <NavLink to={'/cuisine/thai'}> Thai</NavLink>
                        </div>
                        {/* <div className={classes['submenu__section']}>
                            <p>Duration</p>
                            <NavLink to={'/duration/30'}> Up to 30 Minutes </NavLink>
                            <NavLink to={'/duration/60'}> Up to 60 Minutes </NavLink>
                            <NavLink to={'/duration/90'}> 90 Minutes </NavLink>
                        </div> */}
                        <div className={classes['submenu__section']}>
                            <p>Special Recipes</p>
                            <NavLink to={'/diet/vegan'}> Budget Recipies </NavLink>
                            <NavLink to={'/diet/vegetarian'}> Super Healthy Recipes </NavLink>
                            <NavLink to={'/diet/ketogenic'}> Sustainable Recipes </NavLink>
                            <NavLink to={'/duration/30'}> Up to 30 Minutes </NavLink>
                        </div>


                    </div>
                </span>
                <NavLink className={isLinkActive} to={'/articles'} onClick={toggle}>Articles</NavLink>
                <NavLink className={isLinkActive} to={'/about'}>About</NavLink>
                <NavLink className={isLinkActive} to={'/profile'}>Profile</NavLink>
                <div className={classes['header__buttons']}>

{loggedIn ? (

    <NavLink to={'/favorites'}>    <HeaderFavIcon></HeaderFavIcon></NavLink>
) : (
    <div className={classes['header__action']}>
        <Button type='button' version='secondary' outline><NavLink to={'/sign-up'}>Sign Up</NavLink>  </Button>
        <Button type='button' version='logged' outline><NavLink to={'/sign-in'}>Log In</NavLink>  </Button>
    </div>
)
}
</div>
            </nav>

            <IonIcon 
            className={classes['header__icon']} 
            icon={menuOutline}
             size='large' 
             onClick={() => setIsMobile(!isMobile)}
             />

        </header>
    )
}

export default Navbar;