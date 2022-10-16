import { useState, } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { menuOutline, closeOutline, chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

import Button from '../UI/Button';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import HeaderFavIcon from './HeaderFavIcon';
import classes from './Navbar.module.scss';

const Navbar = () => {
    const { loggedIn } = useAuthStatus();
    const [isMobile, setIsMobile] = useState(false);
    const [isDropdown, setIsDropdown] = useState(true);

    const closeMobileMenu = () => {
        setIsMobile(false);
        setIsDropdown(false);
    }
    const isLinkActive = (({ isActive }) => (isActive ? `${classes['navbar__item']} ${classes['is-active']}` : classes['navbar__item']));
    const isMenuMobile = isMobile ? `${classes.header} ${classes['is-mobile']} ${classes['is-open']}` : classes.header;
    const isNotExpanded = isDropdown ? `${classes.submenu} ${classes['is-hidden']}` : classes.submenu;

    return (
        <header className={isMenuMobile}>
            <Link to='/' className={classes.logo} onClick={closeMobileMenu}>HealthyHut</Link>

            <nav className={classes.navbar}>
                <NavLink className={isLinkActive} to={'/'} onClick={closeMobileMenu}>Home</NavLink>
                <NavLink className={isLinkActive} to={'/recipes'} onClick={closeMobileMenu}>All Recipes</NavLink>
                <span className={classes['dropdown-menu']}>
                    {!isMobile && <span className={classes['navbar__item']}>Categories
                        <IonIcon icon={chevronDownOutline} />  </span>
                    }
                    {isMobile && <span className={classes['navbar__item']} onClick={() => setIsDropdown(!isDropdown)}>Categories
                        <IonIcon icon={isDropdown ? chevronDownOutline : chevronUpOutline} />  </span>
                    }

                    <div className={isNotExpanded}>
                        <div className={classes['submenu__section']}>
                            <p>Dish Type</p>
                            <NavLink to={'/dish/breakfast'} onClick={closeMobileMenu}> Breakfast </NavLink>
                            <NavLink to={'/dish/lunch'} onClick={closeMobileMenu}> Lunch </NavLink>
                            <NavLink to={'/dish/salad'} onClick={closeMobileMenu}> Salad </NavLink>
                            <NavLink to={'/dish/soup'} onClick={closeMobileMenu}> Soup </NavLink>
                            <NavLink to={'/dish/appetizer'} onClick={closeMobileMenu}> Appetizer </NavLink>
                            <NavLink to={'/dish/dinner'} onClick={closeMobileMenu}> Dinner </NavLink>
                            <NavLink to={'/dish/dessert'} onClick={closeMobileMenu}> Dessert </NavLink>
                            <NavLink to={'/dish/drink'} onClick={closeMobileMenu}> Drinks </NavLink>
                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Diet Type</p>
                            <NavLink to={'/diet/vegan'}> Vegan </NavLink>
                            <NavLink to={'/diet/vegetarian'}> Vegetarian </NavLink>
                            <NavLink to={'/diet/ketogenic'}> Keto </NavLink>
                            <NavLink to={'/diet/gluten-free'}> Gluten Free </NavLink>
                            <NavLink to={'/diet/dairy-free'}> Dairy Free </NavLink>
                            <NavLink to={'/diet/paleo'}> Paleo</NavLink>
                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Cuisine</p>
                            <NavLink to={'/cuisine/american'} onClick={closeMobileMenu}> American </NavLink>
                            <NavLink to={'/cuisine/british'} onClick={closeMobileMenu}> British </NavLink>
                            <NavLink to={'/cuisine/chinese'} onClick={closeMobileMenu}> Chinese </NavLink>
                            <NavLink to={'/cuisine/european'} onClick={closeMobileMenu}> European </NavLink>
                            <NavLink to={'/cuisine/mediterranean'} onClick={closeMobileMenu}> Mediterranean </NavLink>
                            <NavLink to={'/cuisine/greek'} onClick={closeMobileMenu}> Greek</NavLink>
                            <NavLink to={'/cuisine/italian'} onClick={closeMobileMenu}> Italian</NavLink>
                            <NavLink to={'/cuisine/thai'} onClick={closeMobileMenu}> Thai</NavLink>
                        </div>
                        <div className={classes['submenu__section']}>
                            <p>Special Recipes</p>
                            <NavLink to={'/duration/30'} onClick={closeMobileMenu}> Up to 30 Minutes </NavLink>
                            <NavLink to={'/specials/cheap'} onClick={closeMobileMenu}> Budget Recipies </NavLink>
                            <NavLink to={'/specials/veryHealthy'} onClick={closeMobileMenu}> Super Healthy Recipes </NavLink>
                            <NavLink to={'/specials/sustainable'} onClick={closeMobileMenu}>Sustainable Recipes </NavLink>
                            <NavLink to={'/specials/lowFodmap'} onClick={closeMobileMenu}> Fodmap Friendly </NavLink>
                        </div>
                    </div>

                </span>

                <NavLink className={isLinkActive} to={'/articles'} onClick={closeMobileMenu}>Articles</NavLink>
                <NavLink className={isLinkActive} to={'/about'} onClick={closeMobileMenu}>About</NavLink>
                {loggedIn && <NavLink className={isLinkActive} to={'/profile'} onClick={closeMobileMenu}>Profile</NavLink>}
                <div className={classes['header__buttons']}>

                    {loggedIn ? (
                        <NavLink to={'/favorites'} onClick={closeMobileMenu}>    <HeaderFavIcon /></NavLink>
                    ) : (
                        <div className={classes['header__action']}>
                            <Button type='button' version='secondary' outline onClick={closeMobileMenu}><NavLink to={'/sign-up'}>Sign Up</NavLink>  </Button>
                            <Button type='button' version='logged' outline onClick={closeMobileMenu}><NavLink to={'/sign-in'}>Log In</NavLink>  </Button>
                        </div>
                    )
                    }
                </div>
            </nav>

            <IonIcon
                className={classes['header__icon']}
                icon={isMobile ? closeOutline : menuOutline}
                size='large'
                onClick={() => setIsMobile(!isMobile)}
            />

        </header>
    )
}

export default Navbar;