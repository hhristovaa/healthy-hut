import { Link } from 'react-router-dom';



const ArticleItem = ({ article, id, onDelete }) => {
    return (
        <li>
            <Link to={`/articles/${id}`}>
                <img src={article.imageUrl} alt={article.name} />
                <h3 key={article.id}>{article.name}</h3>
                {/* <div> {article.content}</div> */}
              
                {/* Source:  <a href={article.source} target="_blank">{article.source}</a> */}
                <button>Read More</button>
            </Link>

            {onDelete && (
            <button onClick={() => onDelete(article.id, article.name)}>Delete</button>)
            }
        </li>
    )
}

export default ArticleItem; 