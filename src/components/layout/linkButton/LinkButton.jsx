import { Link } from 'react-router-dom';
import style from './LinkButton.module.scss';

function LinkButton({to,text}){
    return(
        <div className={style.link_button}>
            <Link to={to}>{text}</Link>
        </div>
    )
}

export default LinkButton;