import classes from './Footer.module.scss';

const Footer = () => {
    return (<>
    <footer className={classes.footer}>
        <p>&copy; 2022 Healthy Hut </p>
        {/* <small>Powered by Spoonacular API</small> */}
    </footer>
    </>);
}

export default Footer;