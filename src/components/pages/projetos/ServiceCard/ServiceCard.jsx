import styles from '../card/ProjectCard.module.scss';
import {BsFillTrashFill} from 'react-icons/bs';

function ServiceCard({id, name, cost, description, handleRemove}){

    const remove = (e) =>{
        e.preventDefault();
        handleRemove(id, cost);
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <div className={styles.content}>
                <p>
                <span>Custo: R$ {cost}</span>
                </p>
                <p className={styles.category_text}>
                    {description}
                </p>
                <div className={styles.card_actions}>
                    <button onClick={remove}>
                        <BsFillTrashFill className={styles.remove}/>
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default ServiceCard;