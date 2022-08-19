import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import classes from './signin/SignIn.module.scss';

import { IonIcon } from '@ionic/react';

import { chevronForwardOutline } from 'ionicons/icons';

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
                <input className={classes.emailInput} type="email" name="email" id="email" placeholder='Email' value={email} onChange={onChange} />
               

                <div className={classes.signInBar}>
                  
                    <button className={classes.signUpButton}>
                    Send Reset Link <IonIcon icon={chevronForwardOutline} size='small' />
                    </button>
                </div>
                <button className={classes.signUpButton}> <Link to='/sign-in'>Sign In</Link> </button>
            </form>
        </main>

    )
}

export default ForgotPassword;