import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/UI/Spinner';


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
                            <>
                                <h3 key={article.id}>{article.data.name}</h3>
                                <div> {article.data.content}</div>
                                <img src={article.data.imageUrl} alt="" />
                                Source:  <a href={article.data.source} target="_blank">{article.data.source}</a>
                            </>
                        ))}

                        </ul>
                    </main>
                </>
            ) : (<p>No articles</p>)}

        </>
    )
}

export default Articles;