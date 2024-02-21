import styles from './Input.module.scss';

function Input({type,label,name,planceholder,handleOnChange,value}){
    return(
        <div className={styles.input_form_control}>
            <label htmlFor={name}>{label}:</label>
            <input 
                type={type} 
                name={name} 
                id={name}
                placeholder={planceholder} 
                onChange={handleOnChange} 
                value={value}
            />
        </div>
    )
}

export default Input;