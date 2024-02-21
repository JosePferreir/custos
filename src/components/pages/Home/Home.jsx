import styles from './Home.module.scss';
import banner from '../../../img/savings.svg'
import LinkButton from '../../layout/linkButton/LinkButton';

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Gerencie seus projetos de forma simples e eficiente</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={banner} alt="costs"/>
        </section>
    )
}

export default Home;