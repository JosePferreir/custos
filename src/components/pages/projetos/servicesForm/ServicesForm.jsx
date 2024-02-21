import styles from './ServicesForm.module.scss';
import Input from '../projectForm/Input';
import React, { useState } from 'react';


function ServicesForm({handleSubmit, projectData, btnText}){

    const [service, setService] = useState({});

    const submitForm = (e) => {
        e.preventDefault();
        projectData.services.push(service)
        handleSubmit(projectData);
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form className={styles.form}>
            <div>
                <Input 
                    type="text"
                    placeholder='Insira o nome do serviço'
                    label="Nome do serviço"
                    name="name"
                    handleOnChange={handleChange}
                    />
            </div>
            <div>
                <Input 
                    type="number"
                    placeholder='Insira o valor do serviço'
                    label="Valor do serviço"
                    name="cost"
                    handleOnChange={handleChange}
                   />
            </div>
            <div>
                <Input 
                    type="text"
                    label="Descrição do serviço"
                    placeholder='Insira a descrição do serviço'
                    name="description"
                    handleOnChange={handleChange}
                    />
            </div>
            <div>
                <div className={styles.btn} onClick={submitForm}>{btnText}</div>
            </div>
        </form>
    )
}

export default ServicesForm;