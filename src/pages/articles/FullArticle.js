import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {getDoc, doc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { db } from '../../firebase.config';
import Spinner from '../../components/UI/Spinner';

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
        <>
        <h1>Full article</h1>

        <main>

<p>{article.name}</p>
<p>{article.content}</p>
<p>{article.source}</p>
{/* <p>{article.timestamp.toString()}</p> */}
<img src={article.imageUrl}/>


{auth.currentUser?.uid !== article.userRef && (
    <Link to={`/contacts/${article.userRef}?articleName=${article.name}`}>Access forbidden</Link>
)}
        </main>
        </>
    )

}

export default FullArticle;