import { NavLink } from 'react-router-dom';

const Category = () => {
    return (
        <>
        <NavLink to={'/recipes/vegan'}><h4>Vegan</h4></NavLink>
        <NavLink to={'/recipes/vegetarian'}><h4>Vegetarian</h4></NavLink>
        <NavLink to={'/recipes/keto'}><h4>Keto</h4></NavLink>
        <NavLink to={'/recipes/gluten-free'}><h4>Gluten Free</h4></NavLink>
        <NavLink to={'/recipes/dairy-free'}><h4>Dairy Free</h4></NavLink>
        <NavLink to={'/recipes/low-fodmap'}> <h4>Low Fodmap</h4></NavLink>

        </>
    )

}

export default Category;