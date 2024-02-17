import Image from 'next/image'
import styles from './ChooseCity.module.css'

import cityMap from '../../../public/images/map-frame.png'

export default function ChooseCity() {
    return (
        <div className={styles.choose_city__container}>
            <div className={styles.side_nav}>
                <h5>CHOOSE A CITY</h5>
                <hr/>
            </div>
            <Image
                src={cityMap}
                alt='city-map'
                width={860}
                height={640}
            />
        </div>
    )
}