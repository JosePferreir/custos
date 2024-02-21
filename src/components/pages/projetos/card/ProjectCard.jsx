import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.scss';
import {BsPencil, BsTrash} from 'react-icons/bs';

function ProjectCard({id, name, orcamento, category, handleRemove}){

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id);
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <div className={styles.content}>
                <p>
                <span>Orçamento: R$ {orcamento}</span>
                </p>
                <p className={styles.category_text}>
                    <span className={`${styles[category.name.toLowerCase()]}`}></span>{category.name}
                </p>
                <div className={styles.card_actions}>
                    <Link to={`/projeto/${id}`}>
                        <BsPencil className={styles.edit} />
                    </Link>
                    <button onClick={remove}>
                        <BsTrash className={styles.remove}/>
                    </button>
                    
                </div>
            </div> 
        </div>
        
    )
}

export default ProjectCard;