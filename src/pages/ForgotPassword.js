import {useState} from 'react';
import { Link } from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const onChange = (e) => setEmail (e.target.value);
    
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
        <div>
            <header>
                <p>Forgot Password?</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input type="email" name="email" id="email" placeholder='Email' value={email} onChange={onChange} />
                    <Link to='/sign-in'>Sign In</Link>

<button>Send reset link</button>
                </form>
            </main>
        </div>
    )
}

export default ForgotPassword;