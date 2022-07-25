import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getDoc, doc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { db } from '../../firebase.config';
import Spinner from '../../components/UI/Spinner';
import classes from './Articles.module.scss';

const FullArticle = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const fetchArticle = async () => {
            const docRef = doc(db, 'articles', params.articleId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists())  {
                setArticle(docSnap.data());
                console.log(docSnap.data());
                setLoading(false);
            }

        }

        fetchArticle();
    }, [navigate, params.articleId]);

    if (loading) {
        return <Spinner/>;
    }


    return (
        <main>

        <h1 className={classes['g-heading']}>{article.name}</h1>

        <div className={classes['article__img']}><img src={article.imageUrl}/></div>
<p className={classes['article__content']}>{article.content}</p>
<span>Source: </span><a className={classes['article__source']} href={article.source}>{article.source}</a> <br></br>
{/* <p>{article.timestamp.toString()}</p> */}



{auth.currentUser?.uid !== article.userRef && (
    <Link to={`/contacts/${article.userRef}?articleName=${article.name}`}>Access forbidden</Link>
)}
       
       </main>
    )

}

export default FullArticle;