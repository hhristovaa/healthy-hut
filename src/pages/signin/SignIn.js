import { useState } from 'react';
import { toast } from 'react-toastify';
import classes from './SignIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import OAuth from '../../components/Layout/OAuth';
import SubmitButton from '../../components/UI/SubmitButton';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value

        }))
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (userCredential.user) {
                navigate('/');
                toast.success('Yeyy!');

            }
        } catch (err) {
            console.error(err); 
            toast.error('Wrong user credentials! Please try again.');
        }

    }

    return (
        <main>
            <div>
                <h1 className={classes['g-title']}>Welcome Back!</h1>
            </div>

            <form className={classes.form} onSubmit={onSubmit}>
                <input
                    type='email'
                    className={classes.emailInput}
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onChange}
                />

                <fieldset className={classes.passwordInputWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={classes.passwordInput}
                        placeholder='Password'
                        id='password'
                        value={password}
                        onChange={onChange}
                    />
                    <img src={visibilityIcon} alt="show password" className={classes.showPassword} onClick={() => setShowPassword((prevState) => !prevState)} />
                </fieldset>
                <Link to='/forgot-password' className={classes.forgotPasswordLink}>
                    Forgot Password
                </Link>

           

                <div className={classes.signInBar}>
                <OAuth/>
                    <button className={classes.signInButton}>Sign In</button>
                    <button className={classes.signUpButton}>   <Link to='/sign-up' className={classes.registerLink}>Sign Up Instead</Link></button>
                </div>
            </form>

        
        </main>
    )
}

export default SignIn;