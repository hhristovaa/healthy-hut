import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';

import Button from '../UI/Button';
import GoogleIcon from '../UI/GoogleIcon';

const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleIconClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            const doesUserExist = docSnap.exists();

            if (!doesUserExist) {
                await setDoc(doc, (db, 'users', user.uid), {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });
            }
            navigate('/');
        } catch {
            toast.error('Could not authorize with Google');
        }
    }

    return (
        <Button version='google' onClick={onGoogleIconClick}>
            <GoogleIcon/>{location.pathname === '/sign-up' ? 'Sign Up' : 'Log In'}       
        </Button>
    )
}

export default OAuth;