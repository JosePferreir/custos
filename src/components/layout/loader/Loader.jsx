import loading from '../../../img/loading.svg';
import styles from './Loader.module.scss';

function Loader(){
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="Loading"/>
        </div>
    )
}

export default Loader;