import styles from './Footer.module.css';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';

function Footer(){
    return(
        <div className={styles.footer}>
            <ul className={styles.list}>
                <li className={styles.footer_icon}><FaFacebook/></li>
                <li className={styles.footer_icon}><FaInstagram/></li>
                <li className={styles.footer_icon}><FaLinkedin/></li>
            </ul>
            <p><span className={styles.costs}>COSTS</span> © 2024</p>
        </div>
    )
}

export default Footer;