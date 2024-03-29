import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { personCircleOutline, mailOutline, personOutline } from 'ionicons/icons';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { motion } from "framer-motion";

import ArticleItem from '../../components/Articles/ArticleItem';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import classes from './Profile.module.scss';

const Profile = () => {
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState(null);
    const [updateDetails, setUpdateDetails] = useState(false);

    const [formData, setFormData] = useState({
        firstName: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { firstName, email } = formData;
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
                await updateProfile(auth.currentUser, {
                    displayName: firstName
                });

                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    firstName
                });
                toast.success('Success! Personal details were updated!');
            }

        } catch (err) {
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
        if (window.confirm('Do you want to delete this article?')) {
            await deleteDoc(doc(db, 'articles', articleId));
            const updatedArticles = articles.filter((article) => article.id !== articleId);
            setArticles(updatedArticles);
            toast.success('Successfully deleted');
        }
    }

    const onEdit = (articleId) => navigate(`/edit-article/${articleId}`);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 1
            }}
        >
            <h1 className={classes['g-title']}>Profile</h1>
            <section className={classes['personal-details']}>
                <h3 className={classes['g-description']}>Personal Details</h3>
                <div className={classes['personal-details__header']}>
                    <div className={classes['personal-details__info']}>
                        <IonIcon icon={personCircleOutline} className={classes['personal-details__icon']} />
                        <p>Hello {firstName}</p>
                        <small>Admin</small>
                        <Button version='create' type='button'><Link to='/create-article'>New article</Link></Button>
                    </div>
                    <form className={classes['personal-details__form']}>
                        <Input
                            type="text"
                            id="firstName"
                            value={firstName}
                            disabled={!updateDetails} onChange={onChange}
                            icon={personOutline}
                        />
                        <Input
                            type="text"
                            id="email"
                            value={email}
                            disabled icon={mailOutline}
                        />
                        <div className={classes['personal-details__action']}>
                            <Button type='button'
                                version='secondary'
                                onClick={() => {
                                    updateDetails && onSubmit()
                                    setUpdateDetails((prevState) => !prevState)
                                }}>
                                {updateDetails ? 'Done' : 'Change'}
                            </Button>
                            <Button
                                type='button'
                                version='danger'
                                outline
                                onClick={onLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </form>
                </div>

                {!loading && articles?.length > 0 && (
                    <section>
                        <h3 className={classes['g-description']}>Your articles</h3>
                        <div className={classes.articles}>
                            {articles.map((article) => (
                                <ArticleItem
                                    key={article.id}
                                    article={article.data}
                                    id={article.id}
                                    onDelete={() => onDelete(article.id)}
                                    onEdit={() => onEdit(article.id)}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </section>
        </motion.main>
    )
}

export default Profile;
