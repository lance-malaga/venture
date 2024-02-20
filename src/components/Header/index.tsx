import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'

import Logo from '../../../public/icons/logo-black.svg'

export default function Header(){
    const router = useRouter();

    return (
        <header className={styles.header__container}> 
            <div className={styles.logo}>
                <Link href={'/'}>
                    <Image src={Logo} alt="logo-black" width={20} height={21}/>
                    <p>VENTURE</p>
                </Link>
            </div>
            <div className={styles.nav__links}>
                <Link 
                    href={'/'}
                    style={{fontWeight: router.pathname === '/' ? 'bold' : 400}}
                > Home </Link>
                <Link 
                    href={'/statistics'}
                    style={{fontWeight: router.pathname === '/statistics' ? 'bold' : 400}}
                > Statistics </Link>
            </div>
        </header>
    )
}