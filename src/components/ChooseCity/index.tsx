import Image from 'next/image'
import styles from './ChooseCity.module.css'

import cityMap from '../../../public/images/map-frame.png'
import { cities } from '@/data/cities'

export default function ChooseCity() {
    return (
        <div className={styles.choose_city__container}>
            <div className={styles.side_nav}>
                <h5>CHOOSE A CITY</h5>
                <hr/>
                {cities.map((data, index) => (
                    <div key={index} className={styles.city}>
                        <p>{data.city}</p>
                        <Image 
                            src={data.image}
                            alt={data.city}
                            width={150}
                            height={180}
                        />
                    </div>
                ))}
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