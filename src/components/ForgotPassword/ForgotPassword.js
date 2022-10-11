import { useState } from 'react';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import { homeOutline, personOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Input from '../UI/Input';
import classes from './ForgotPassword.module.scss';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Reset password email was sent.');
        } catch {
            toast.error('Could not send reset password email.');
        }
    }

    return (
        <Modal onClose={props.onClose}>
            <section className={classes['reset-password']}>
            <IonIcon className={classes['reset-password__close']} icon={closeCircleOutline} onClick={props.onClose} size='large'/>
            <h1 className={classes['g-heading']}>Forgot Password?</h1>
            <form className={classes['reset-password__form']} onSubmit={onSubmit}>
                <Input 
                type="email" 
                name="email" 
                id="email" 
                placeholder='Email' 
                value={email} 
                onChange={onChange} 
                icon={personOutline}
                />
                <Button type='submit' version='secondary'>
                    Send Reset Link
                </Button>
                <Link to='/'><IonIcon icon={homeOutline} size='large' className={classes['home-icon']}>Home </IonIcon></Link>
            </form>
            </section>
        </Modal>

    )
}

export default ForgotPassword;