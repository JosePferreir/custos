import ProjectForm from '../projectForm/ProjectForm';
import style from './NewProject.module.scss';
import {useNavigate} from 'react-router-dom';

function NewProject(){

    const navigate = useNavigate();

    function createProject(project){
        //initialize cost and services
        project.costs = 0;
        project.services = [];
        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            const state = { message: "Projeto criado com sucesso!" };
            navigate("/projetos", {state});
        })
        .catch((err) => console.log(err));
    }

    return(
        <div className={style.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createProject}/>
        </div>
    )
}

export default NewProject;