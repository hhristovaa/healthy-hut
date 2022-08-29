import { NavLink } from 'react-router-dom';


const Category = () => {
    return (
        <>
        <NavLink to={'/diet/vegan'}><h4>Vegan</h4></NavLink>
        <NavLink to={'/diet/vegetarian'}><h4>Vegetarian</h4></NavLink>
        <NavLink to={'/diet/ketogenic'}><h4>Keto</h4></NavLink>
        <NavLink to={'/diet/gluten-free'}><h4>Gluten Free</h4></NavLink>
        <NavLink to={'/diet/dairy-free'}><h4>Dairy Free</h4></NavLink>
        <NavLink to={'/diet/low-fodmap'}> <h4>Low Fodmap</h4></NavLink>

        </>
    )

}

export default Category;