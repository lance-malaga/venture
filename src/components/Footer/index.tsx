import styles from './Footer.module.css'
import Image from 'next/image'

import Logo from '../../../public/icons/logo-white.svg'

export default function Footer(){
    return (
        <footer className={styles.footer__container}> 
            <div className={styles.content__container}>
                <p>© 2024 Venture. All  rights reserved.</p>
                <div>
                    <Image src={Logo} alt="logo png" width={20} height={21}/>
                    <p>VENTURE</p>
                </div>
                <p>venture@mail.com</p>
            </div>
        </footer>
    )
}