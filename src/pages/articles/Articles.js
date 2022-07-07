import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../../components/UI/Spinner';
import ArticleItem from '../../components/Articles/ArticleItem';


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
                toast.error('Could not fetch articles from db');

            }


        }
        fetchArticles();

    }, []);

    return (
        <>
            <h1>All Articles</h1>
            <div>

            </div>

            {loading ? (<Spinner />) : articles && articles.length > 0 ? (
                <>
                    <main>
                        <ul>{articles.map((article) => (
                            <ArticleItem article={article.data} id={article.id} key={article.id}/>
                        ))}

                        </ul>
                    </main>
                </>
            ) : (<p>No articles</p>)}

        </>
    )
}

export default Articles;