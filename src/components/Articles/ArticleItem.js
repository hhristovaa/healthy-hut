import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import classes from './ArticleItem.module.scss';

import { IonIcon } from '@ionic/react';

import { trashOutline, openOutline } from 'ionicons/icons';


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
            <div className={classes.action}>
                {onDelete && (
                    <IonIcon className={classes['btn-delete']} icon={trashOutline} onClick={() => onDelete(article.id, article.name)} />
                )}
                {onEdit && (
                    <IonIcon className={classes['btn-edit']} icon={openOutline} onClick={() => onEdit(id)} />
                )}
            </div>
        </Card>
    )
}

export default ArticleItem; 