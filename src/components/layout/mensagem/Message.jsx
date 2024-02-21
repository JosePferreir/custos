import styles from './Message.module.scss';
import React, {useState, useEffect} from 'react';

function Message({type, msg}) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if(msg){
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    },[msg])

    return(<>
    {show &&( 
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
    )}
        
    </>
    )
    
}

export default Message;