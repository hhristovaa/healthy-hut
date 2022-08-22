import { useState } from 'react';
import { toast } from 'react-toastify';
import classes from './SignIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAuth from '../../components/Layout/OAuth';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

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
                toast.success('You have logged in successfully!');

            }
        } catch (err) {
            console.error(err);
            toast.error('Wrong user credentials! Please try again.');
        }

    }

    return (
        <main>

            <h1 className={classes['g-title']}>Welcome Back!</h1>

            <form className={classes.form} onSubmit={onSubmit}>
                <Input type='email'
                    placeholder='Email'
                    id='email'
                    value={email}
                    onChange={onChange}
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
                    <Link to='/forgot-password' className={classes['forgot-password']}>
                        Forgot Password?
                    </Link>
                    <Link to='/sign-up' className={classes['signup-url']}>Sign Up Instead</Link>
                </div>
            </form>
            <div className={classes['btn-container__social']}>
                <Button version='primary' type='submit'>Sign In</Button>
                <strong>OR</strong>
                <OAuth />
            </div>
        </main>
    );
}

export default SignIn;