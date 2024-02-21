import Message from "../../layout/mensagem/Message";
import { useLocation } from "react-router-dom";
import styles from './Projetos.module.scss';
import Container from '../../layout/Container';
import LinkButton from '../../layout/linkButton/LinkButton';

function Projetos(){

    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
        console.log(message)
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message}/> }
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>
    )
}

export default Projetos;