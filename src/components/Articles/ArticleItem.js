import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import classes from './ArticleItem.module.scss';


const ArticleItem = ({ article, id, onDelete, onEdit }) => {
    return (
        <Card className={classes['article__card']}>
            <Link to={`/articles/${id}`}>
                <div className={classes['article__img']}>
                    <img src={article.imageUrl} alt={article.name} />
                </div>
                <div className={classes['article__content']}>
                    <h3 className={classes['article__header']} key={article.id}>{article.name}</h3>
                    <p className={classes['article__desc']}> {article.content}</p>

                    {/* Source:  <a href={article.source} target="_blank">{article.source}</a> */}
                    <button className={classes['btn-more']}>Read More</button>


                </div>
            </Link>
            {onDelete && (
                <button className={classes['btn-delete']} onClick={() => onDelete(article.id, article.name)}>Delete</button>)
            }
            {onEdit && (
                <button className={classes['btn-delete']} onClick={() => onEdit(id)}>Edit</button>)
            }

        </Card>
    )
}

export default ArticleItem; 