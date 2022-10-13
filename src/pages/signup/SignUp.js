import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline, mailOutline, personOutline } from 'ionicons/icons';

import OAuth from '../../components/Layout/OAuth';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import classes from '../signin/SignIn.module.scss';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const { firstName, lastName, email, password } = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
       

        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value

        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();


        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            updateProfile(auth.currentUser, {
                displayName: firstName,
            });

            const formDataCopy = { ...formData };

            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, 'users', user.uid), formDataCopy);
            toast.success('Your account has been successfully created!');
            navigate('/');

        } catch (err) {
            console.error(err);
            toast.error('Something went wrong! Please try again.');
        }
    }

    return (
        <main>
            <h1 className={classes['g-title']}>Welcome!</h1>
            <form className={classes.form} onSubmit={onSubmit}>
                <Input
                    type='text'
                    placeholder='First Name'
                    id='firstName'
                    value={firstName}
                    onChange={onChange}
                    required
                    icon={personOutline}
                />
                <Input
                    type='text'
                    placeholder='Last Name'
                    id='lastName'
                    value={lastName}
                    onChange={onChange}
                    required
                    icon={personOutline}
                />
                <Input
                    type='email'
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onChange}
                    required
                    icon={mailOutline}
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
                    <Button version='primary'><Link to='/sign-up' className={classes.registerLink}>Sign Up</Link></Button>
                </div>
            </form>
            <div className={classes['btn-container__social']}>
                {/* <OAuth />
                <strong>OR</strong> */}
                <Link to='/sign-in' className={classes['signup-url']}>Log In Instead</Link>
            </div>
        </main>
    );
}

export default SignUp;