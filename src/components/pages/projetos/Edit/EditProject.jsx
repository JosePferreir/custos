import React,{useState, useEffect} from 'react';
import styles from './EditProject.module.scss';
import { useParams } from 'react-router-dom';
import Loader from '../../../layout/loader/Loader';
import Container from '../../../layout/Container';
import ProjectForm from '../projectForm/ProjectForm';
import Message from '../../../layout/mensagem/Message'
import ServicesForm from '../servicesForm/ServicesForm';
import { parse, v4 as uuidv4 } from 'uuid';
import ServiceCard from '../ServiceCard/ServiceCard';

function EditProject() {
  
    const { id } = useParams();
    
    const [project, setProject] = useState({});
    const [sowProjectForm, setSowProjectForm] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [services, setServices] = useState([]);

    function editPost(project){
        setMessage('');
        // budget validation
        if(project.orcamento < project.costs){
            setMessage("O orçamento não pode ser menor que o valor já utilizado!");
            setMessageType("error");
            return false;
        }
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setSowProjectForm(false);
            setMessage("Projeto editado com sucesso!");
            setMessageType("success");
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(resp => resp.json())
        .then(data=> {
            setProject(data);
            setServices(data.services);
        })
        .catch((err) => console.log(err))

    },[id]);

    function toggleProjectForm(){
        setSowProjectForm(!sowProjectForm);
    };

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    function createService(project){
        setMessage('');
        
        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const newCost = parseFloat(project.costs) + parseFloat(lastService.cost);

        console.log(newCost)
        console.log(project.orcamento)
        if(newCost > project.orcamento){
            console.log('entrou')
            setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
            setMessageType("error");
            project.services.pop();
            return false;
        }

        project.costs = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)})
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowServiceForm(false);
                setMessage("Serviço adicionado com sucesso!");
                setMessageType("success");
            })
            .catch((err) => console.log(err));
    }

    function removeService(id, cost){
        setMessage('');
        const newServices = project.services.filter((service) => service.id !== id);
        project.costs = parseFloat(project.costs) - parseFloat(cost);
        project.services = newServices;
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data);
            setServices(data.services);
            setMessage("Serviço removido com sucesso!");
            setMessageType("success");
        })
        .catch((err) => console.log(err));
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && 
                            <Message type={messageType} msg={message}/>
                        }
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {sowProjectForm ? "Fechar" : "Editar"}
                            </button>
                            {
                                sowProjectForm ? (
                                    <div className={styles.project_info}>
                                        <ProjectForm 
                                            btnText="Editar Projeto"
                                            handleSubmit={editPost}
                                            projectData={project}/>
                                    </div>
                                ):(
                                    <div className={styles.project_info}>
                                        <p>
                                            <span>Categoria:</span> {project.category.name}
                                        </p>
                                        <p>
                                            <span>Total de Orçamento:</span> R${project.orcamento}
                                        </p>
                                        <p>
                                            <span>Total utilizado:</span> R${project.costs}
                                        </p>
                                    </div>
                                
                                )
                            }
                        </div>
                        <div className={styles.services_form_container}>
                            <h2>Adicione um Serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {showServiceForm ? "Fechar" : "Adicionar Serviço"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServicesForm
                                        handleSubmit={createService}
                                        projectData={project}
                                        btnText="Adicionar Serviço"
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                                ))
                            ) : (
                                <p>Nenhum serviço cadastrado</p>
                            )
                        }
                        </Container>
                    </Container>
                </div>
            ):(
                <Loader/>
            )}
        </>
    );
}

export default EditProject;
