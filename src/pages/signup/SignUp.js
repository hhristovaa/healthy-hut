import { useState } from 'react';
import classes from '../signin/SignIn.module.scss';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {setDoc, doc, serverTimestamp} from 'firebase/firestore';
import {db} from '../../firebase.config';
import visibilityIcon from '../../assets/svg/visibilityIcon.svg';
import OAuth from '../../components/Layout/OAuth';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        hasAdminRights: false
    });

    const { firstName, lastName, email, password, hasAdminRights } = formData;

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, password, hasAdminRights);
            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: firstName,
            });

            const formDataCopy = {...formData};

            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, 'users', user.uid), formDataCopy);
            toast.success('You have create an account!');
            navigate('/');

        }catch (err) {
            console.error(err);
            toast.error('Something went wrong! Please try again.');
        }
    }


    return (
        <main>
            <div>
                <h1 className={classes['g-title']}>Welcome!</h1>
            </div>

            <form className={classes.form} onSubmit={onSubmit}>
                <input
                    type='text'
                    className={classes.emailInput}
                    placeholder='First Name'
                    id='firstName'
                    value={firstName}
                    onChange={onChange}
                />
                <input
                    type='text'
                    className={classes.emailInput}
                    placeholder='Last Name'
                    id='lastName'
                    value={lastName}
                    onChange={onChange}
                />
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

            
            </form>


            
            <div className={classes.signInBar}>
                <OAuth/>
                    <button className={classes.signInButton}>Sign Up</button>
                    <button className={classes.signUpButton}>   <Link to='/sign-in' className={classes.registerLink}>Sign In Instead</Link></button>
                </div>

        </main>
    )
}

export default SignUp;