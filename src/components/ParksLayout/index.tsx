import Image from 'next/image'
import styles from './ParksLayout.module.css'
import Link from 'next/link'

export default function ParksLayout(props: IParksLayoutProps) {
    return (
        <div className={styles.parks_layout}>
            <Image
                src={props.image}
                alt={props.name}
                width={660}
                height={450}
            />
            <div>
                <h5>{props.name}</h5>
                <hr/>
                <p>{props.desc}</p>
                <button>
                    <Link href={props.link} target='_blank'>View Map</Link>
                </button>
            </div>
        </div>
    )
}