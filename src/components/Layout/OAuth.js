import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';

const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleIconClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            //check for user

            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            const doesUserExist = docSnap.exists();

            if (!doesUserExist){
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
        <div>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with Google
            <button onClick={onGoogleIconClick}>GOOGLE</button></div>
    )
}

export default OAuth;