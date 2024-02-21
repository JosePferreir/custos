import styles from './Select.module.scss'

function Select({label,name,options,handleOnChange,value}){
    return(
        <div className={styles.select_form_control}>
            <label htmlFor={name}>{label}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}>
                    <option>Selecione uma opção</option>
                    {options.length > 0 && options.map((option) => (
                        <option
                            key={option.id}
                            value={option.id}>
                                {option.name}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default Select;