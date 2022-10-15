import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { motion } from 'framer-motion';

import Spinner from '../../components/UI/Spinner';
import ArticleItem from '../../components/Articles/ArticleItem';
import classes from './Articles.module.scss';
import NoResults from '../../components/UI/NoResults';

const Articles = () => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                //get reference
                const articlesRef = collection(db, 'articles');
                const articlesData = await getDocs(articlesRef);
                const articles = [];

                articlesData.docs.forEach(article => {
                    return articles.push({
                        id: article.id,
                        data: article.data()
                    });

                });

                setArticles(articles);
                setLoading(false);
            } catch (err) {
                toast.error('An error occured while loading the articles.');
            }


        }
        fetchArticles();

    }, []);

    return (
        <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
    >
            <h1 className={classes['g-title']}>All Articles</h1>
            {loading ? (<Spinner />) : articles && articles.length > 0 ? (
                <section className={classes.articles}>{articles.map((article) => (
                    <ArticleItem article={article.data} id={article.id} key={article.id} />
                ))}

                </section>


            ) : <NoResults/>}
        </motion.main>
    )
}

export default Articles;