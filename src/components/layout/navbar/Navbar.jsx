import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';
import Container from '../Container';
import logo from '../../../img/costs_logo.png'

function Navbar() {
  return (
    <div>
        <div className={styles.navbar}>
            <Container>
                <Link to="/">
                    <img src={logo} alt="Costs"/>
                </Link>
                <ul className={styles.items}>
                    <li className={styles.item}><Link to="/">HOME</Link></li>
                    <li className={styles.item}><Link to="/projetos">PROJETOS</Link></li>
                    <li className={styles.item}><Link to="/contato">CONTATO</Link></li>
                    <li className={styles.item}><Link to="/campany">COMPANY</Link></li>
                    <li className={styles.item}><Link to="/newproject">NEW PROJECT</Link></li>
                </ul>
                
            </Container>
        </div>
        
        
    </div>
  )
}

export default Navbar;