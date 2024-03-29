import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { eyeOutline, eyeOffOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { motion } from 'framer-motion';

import { useAuthStatus } from '../../hooks/useAuthStatus';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import ForgotPassword from '../../components/ForgotPassword/ForgotPassword';
import classes from './SignIn.module.scss';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordForgotten, setForgottenPassword] = useState(false);
    const { loggedIn } = useAuthStatus();

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
                toast.success('You have logged in successfully!');
            }
        } catch (err) {
            toast.error('Wrong user credentials! Please try again.');
        }

    }

    const openModal = () => {
        setForgottenPassword(true);
    }
    const closeModal = () => {
        setForgottenPassword(false);
    }

    useEffect(() => {

        if (loggedIn) {
            navigate('/profile');
        }
    });

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className={classes['g-title']}>Welcome Back!</h1>
            <form className={classes.form} >
                <Input type='email'
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onChange}
                    icon={personOutline}
                    required
                />
                <div className={classes['password-wrapper']}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        className={classes.passwordInput}
                        placeholder='Password'
                        id='password'
                        value={password}
                        onChange={onChange}
                        required
                    />
                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} onClick={() => setShowPassword(prevState => !prevState)} />
                </div>
                <div className={classes['btn-container']}>
                    <a href="#" className={classes['forgot-password']} onClick={openModal}>
                        Forgot Password?
                    </a>
                    <Link to='/sign-up' className={classes['signup-url']}>Sign Up Instead</Link>
                    {isPasswordForgotten && <ForgotPassword onClose={closeModal} />}
                </div>
            </form>
            <div className={classes['btn-container__social']}>
                <Button version='primary' type='submit' onClick={onSubmit}>Log In</Button>
            </div>
        </motion.main>
    );
}

export default SignIn;