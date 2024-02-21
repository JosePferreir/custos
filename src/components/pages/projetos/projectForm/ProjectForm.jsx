import Input from './Input';
import style from './ProjectForm.module.scss';
import Select from './Select';
import React,{useState, useEffect} from 'react';

function ProjectForm({handleSubmit, projectData, btnText}){

    const [project, setProject] = useState(projectData || {})
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();
        console.log(projectData)
        handleSubmit(project);
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
    }
    function handleSelectChange(e){
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return(
        <form className={style.projectForm_wrapper}>
            <div>
                <Input 
                    type="text"
                    placeholder='Insira o nome do projeto'
                    label="Nome do projeto"
                    name="name"
                    handleOnChange={handleChange}
                    value={project.name}/>
            </div>
            <div>
                <Input 
                    type="number"
                    placeholder='Insira o orçamento total'
                    label="Orçamento do Projeto"
                    name="orcamento"
                    handleOnChange={handleChange}
                    value={project.orcamento}/>
            </div>
            <div>
                <Select
                    name="category_id"
                    label="Selecione a categoria"
                    options={categories}
                    handleOnChange={handleSelectChange}
                    value={project.category ? project.category.id : ''}/>
            </div>
            <div>
                <div className={style.btn} onClick={submitForm}>{btnText}</div>
            </div>
        </form>
    )
}

export default ProjectForm;