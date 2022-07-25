import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import ArticleItem from '../../components/Articles/ArticleItem';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Profile.module.scss';

const Profile = () => {
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState(null);
    const [updateDetails, setUpdateDetails] = useState(false);

    const [formData, setFormData] = useState({
        firstName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        isAdmin: auth.currentUser.hasAdminRights
    });

    console.log(auth.currentUser)

    const { firstName, email, isAdmin } = formData;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserArticles = async () => {
            const articlesRef = collection(db, 'articles');
            const q = query(articlesRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));

            const querySnap = await getDocs(q);

            let articles = [];
            querySnap.forEach((doc) => {
                return articles.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            setArticles(articles);
            setLoading(false);
        }

        fetchUserArticles()
    }, [auth.currentUser.uid]);

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


    const onDelete = async (articleId) => {
        if (window.confirm('Sure bro?')) {
            await deleteDoc(doc(db, 'articles', articleId));
            const updatedArticles = articles.filter((article) => article.id !== articleId);
            setArticles(updatedArticles);
            toast.success('Successfully deleted');
        }



    }



    return (
        <main>
            <h1 className={classes['g-heading']}>Profile</h1>
            <h3 className={classes['g-title']}>Hello {firstName} </h3>
            <p>{isAdmin}</p>

            <section>
                <div>
                    <p>Personal Details</p>
                    <button type='button' className={classes['profile__btn']} onClick={() => {
                        updateDetails && onSubmit()
                        setUpdateDetails((prevState) => !prevState)
                    }}>{updateDetails ? 'Done' : 'Change'}</button>
                </div>

                <div>
                    <form>
                        <input type="text" id="firstName" value={firstName} className={!updateDetails ? 'profileName' : 'profileNameActive'} disabled={!updateDetails} onChange={onChange} />
                        <input type="text" id="email" value={email} className={!updateDetails ? 'profileName' : 'profileNameActive'} disabled />
                    </form>
                </div>            <button type='button' className="logout" onClick={onLogout}>
                    Logout
                </button>


                <Link to='/create-article'>Create new article</Link>


                {!loading && articles?.length > 0 && (
                    <>
                        <p>Your articles</p>
                        <ul>
                            {articles.map((article) => (
                                <ArticleItem key={article.id} article={article.data} id={article.id} onDelete={() => onDelete(article.id)} />
                            ))}
                        </ul>


                    </>
                )}


            </section>

        </main>
    )
}

export default Profile;
