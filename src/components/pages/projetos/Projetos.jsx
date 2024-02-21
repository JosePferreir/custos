import Message from "../../layout/mensagem/Message";
import { useLocation } from "react-router-dom";
import styles from './Projetos.module.scss';
import Container from '../../layout/Container';
import LinkButton from '../../layout/linkButton/LinkButton';
import ProjectCard from "./card/ProjectCard";
import React, { useEffect, useState } from "react";
import Loader from "../../layout/loader/Loader";

function Projetos(){

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMessage, setDeleteMessage] = useState('');

    const location = useLocation();
    let message = '';
    if(location.state){
        message = location.state.message;
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(resp => resp.json())
        .then(data=> {
            const updatedData = data.map(project => {
                return {...project, name: project.name.charAt(0).toUpperCase() + project.name.slice(1)};
            });
            setProjects(updatedData);
            setLoading(false);
        })
        .catch((err) => console.log(err))
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(resp => resp.json())
        .then(data=> {
            const updatedProjects = projects.filter(project => project.id !== id);
            setProjects(updatedProjects);
            setDeleteMessage('Projeto removido com sucesso');
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message}/> }
            {deleteMessage && <Message type="success" msg={deleteMessage}/> }
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map(project => {
                        return <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            orcamento={project.orcamento} 
                            category={project.category}
                            handleRemove={removeProject} />
                    })
                }
                {
                    loading && <Loader />
                }
            </Container>
        </div>
    )
}

export default Projetos;