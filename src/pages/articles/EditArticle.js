import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';

import Spinner from '../../components/UI/Spinner';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import classes from './Articles.module.scss';

const EditArticle = () => {
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        content: '',
        source: '',
    });

    const { name, content, source } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const params = useParams();
    const isMounted = useRef(true);

    useEffect(() => {
        setLoading(true);
        const getArticle = async () => {
            const docRef = doc(db, 'articles', params.articleId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setArticle(docSnap.data());
                setFormData({ ...docSnap.data() });
                setLoading(false);
            } else {
                navigate('/');
                toast.error('Article does not exist!');
            }
        }

        getArticle();

    }, [params.articleId, navigate]);
    // redirect if article is not user's

    useEffect(() => {
        if (article && article.userRef !== auth.currentUser.uid) {
            toast.error('You cannot edit that article');
            navigate('/');
        }
    });

    //fetch articles to edit 
    useEffect(() => {

        const fetchArticle = async () => {
            const docRef = doc(db, 'articles', params.articleId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setArticle(docSnap.data());
                setFormData({ ...docSnap.data() });
                setLoading(false);
            }
        }

        fetchArticle();
    }, [navigate, params.articleId]);

    //set to logged user
    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid });
                } else {
                    navigate('/sign-in');
                }
            });
        }

        return () => {
            isMounted.current = false;
        }

    }, [isMounted]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataCopy = {
            ...formData,
            timestamp: serverTimestamp()
        };

        const docRef = doc(db, 'articles', params.articleId);
        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success('The article was successfully updated!');
        navigate(`/articles/${docRef.id}`)
    }

    const onChange = e => {
        let eTarget = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [eTarget.id]: eTarget.value
        }));
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <main>
            <h1 className={classes['g-title']}>Edit Article</h1>
            <form onSubmit={onSubmit} className={classes['articles__form']}>
                <Input type='text' id='name' label='Name' onChange={onChange} value={name} />
                <Input type='text' id='source' label='Source' onChange={onChange} value={source} />
                <Input multiline type='text' id='content' label='Content' onChange={onChange} value={content} />
                <Button type="submit" version='change'>Edit Article</Button>
            </form>
        </main>
    )
}

export default EditArticle;