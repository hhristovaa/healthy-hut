import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { IonIcon } from '@ionic/react';
import { calendarOutline, globeOutline } from 'ionicons/icons';

import Spinner from '../../components/UI/Spinner';
import classes from './Articles.module.scss';

const FullArticle = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchArticle = async () => {
            const docRef = doc(db, 'articles', params.articleId);
            const docSnap = await getDoc(docRef);
            if (docSnap?.exists()) {
                setArticle(docSnap.data());
                setLoading(false);
            }
        }

        fetchArticle();
        return () => controller.abort();
    }, [navigate, params.articleId]);

    const articleTimeInSeconds = article?.timestamp.seconds;
    const articleTimeInMs = articleTimeInSeconds * 1000;
    const articleDate = new Date(articleTimeInMs);

    if (loading) {
        return <Spinner />;
    }

    return (
        <main>
            <h1 className={classes['g-heading']}>{article.name}</h1>
            <section className={classes.article}>
                <div className={classes['article__img']}><img src={article.imageUrl} alt={article.name} /></div>
                <p className={classes['article__content']}>{article.content}</p>
                <div className={classes['article__source']}>
                <a className={classes['article__source-url']} href={article.source} target='_blank' rel='noreferrer'><IonIcon icon={globeOutline} />{article.source}</a>
                </div>
                <span className={classes['article__date']} ><IonIcon icon={calendarOutline} />{articleDate.toLocaleDateString('en-GB')}</span>
            </section>
        </main>
    )

}

export default FullArticle;