import styles from './Header.module.css'

import Image from 'next/image'
import Logo from '../../../public/icons/logo-black.svg'
import Link from 'next/link'

export default function Header(){
    return (
        <header className={styles.header__container}> 
            <div className={styles.logo}>
                <Image src={Logo} alt="logo-black" width={20} height={21}/>
                <p>VENTURE</p>
            </div>
            <div className={styles.nav__links}>
                <Link href={'/'}> Home </Link>
                <Link href={'/'}> Statistics </Link>
            </div>
        </header>
    )
}