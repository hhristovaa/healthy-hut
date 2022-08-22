import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import classes from './signin/SignIn.module.scss';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Email was sent.');
        } catch {
            toast.error('Could not reset email');
        }

    }

    return (
        <main>
            <h1 className={classes['g-title']}>Forgot Password?</h1>


            <form className={classes.form} onSubmit={onSubmit}>
                <Input type="email" name="email" id="email" placeholder='Email' value={email} onChange={onChange} />

                <Button type='submit' version='login'>
                    Send Reset Link
                </Button>


            </form>
        </main>

    )
}

export default ForgotPassword;