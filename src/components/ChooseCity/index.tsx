import Image from 'next/image'
import { useState } from 'react'
import styles from './ChooseCity.module.css'
import Link from 'next/link'

import cityMap from '../../../public/images/map-frame.png'
import { cities } from '@/data/cities'

export default function ChooseCity() {

    const [selectedCity, setSelectedCity] = useState(null);
    const handleCityClick = (city: any) => {
        setSelectedCity(city);
    };
    return (
        <div className={styles.choose_city__container}>
            <div className={styles.side_nav}>
                <div>
                    <h5>CHOOSE A CITY</h5>
                    <hr/>
                </div>
                <div className={styles.side_nav__cities}>
                    {cities.map((data, index) => (
                        <div key={index} className={styles.city} >
                            <p>{data.city}</p>
                            <Link href={`/map/avg-rent`}>
                            <Image 
                                onClick={() => handleCityClick(data.city)}
                                src={data.image}
                                alt={data.city}
                                width={150}
                                height={180}
                            />
                            </Link>
                        </div>
                    ))}
                </div>
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