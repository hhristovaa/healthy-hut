import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
    const auth = getAuth();
    const [updateDetails, setUpdateDetails] = useState(false);

    const [formData, setFormData] = useState({
        firstName: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { firstName, email } = formData;

    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();

        navigate('/');
    }

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== firstName) {
                //update display name in fb
                await updateProfile(auth.currentUser, {
                    displayName: firstName
                })

                //update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    firstName
                })

                toast.success('Success! Personal details were updated!');
            }

        } catch (err) {
            console.error(err);
            toast.error('Error! Information was not updated!')
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }




    return (
        <>
            <h1>Profile</h1>
            <h3>Hello {firstName}</h3>
            <button type='button' className="logout" onClick={onLogout}>
                Logout
            </button>

            <main>
                <div>
                    <p>Personal Details</p>
                    <p onClick={() => {
                        updateDetails && onSubmit()
                        setUpdateDetails((prevState) => !prevState)
                    }}>{updateDetails ? 'done' : 'change'}</p>
                </div>

                <div>
                    <form>
                        <input type="text" id="firstName" value={firstName} className={!updateDetails ? 'profileName' : 'profileNameActive'} disabled={!updateDetails} onChange={onChange} />
                        <input type="text" id="email" value={email} className={!updateDetails ? 'profileName' : 'profileNameActive'} disabled/>
                    </form>
                </div>
            </main>

        </>
    )
}

export default Profile;
