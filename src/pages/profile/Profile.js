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

    const onEdit = (articleId) => navigate(`/edit-article/${articleId}`);


    return (
        <main>
            <h1 className={classes['g-title']}>Profile</h1>
            <h2 className={classes['g-heading']}>Hello {firstName} </h2>
            <p>{isAdmin}</p>
            <button type='button' className={classes['btn-logout']}  onClick={onLogout}>
          Logout
        </button>

            <section className={classes['personal-details']}>
                <div className={classes['personal-details__header']}>
                    <h3 className={classes['g-description']}>Personal Details</h3>
                 
                  
                    <form className={classes['personal-details__form']}>
                        <input type="text" id="firstName" value={firstName} className={!updateDetails ? 'profileName' : 'profileNameActive'} disabled={!updateDetails} onChange={onChange} />
                        <input type="text" id="email" value={email} className={!updateDetails ? 'profileName' : 'profileNameActive'} disabled />
                        <button type='button' className={classes['btn']} onClick={() => {
                        updateDetails && onSubmit()
                        setUpdateDetails((prevState) => !prevState)
                    }}>{updateDetails ? 'Done' : 'Change'}</button>
                    </form>
                    
                </div>            

                <button className={classes['btn-create']}><Link to='/create-article'>New article</Link></button>


                {!loading && articles?.length > 0 && (
                    <section>
                        <h3 className={classes['g-description']}>Your articles</h3>
                        <div className={classes.articles}>
                            {articles.map((article) => (
                                <ArticleItem key={article.id} article={article.data} id={article.id} onDelete={() => onDelete(article.id)} onEdit={() => onEdit(article.id)} />
                            ))}
                        </div>


                    </section>
                )}


            </section>

        </main>
    )
}

export default Profile;
