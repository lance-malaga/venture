import Image from 'next/image'
import Link from 'next/link'
import styles from './RentSiteCard.module.css'

export default function RentSiteCard(props: IRentSiteProps) {
    return (
        <div className={styles.card}>
            <Link href={props.link} target='_blank'>
                <Image
                    src={props.image}
                    alt={props.site}
                    width={360}
                    height={240}
                />
            </Link>
            <hr/>
            <div>
                <h5>{props.site}</h5>
                <p>{props.desc}</p>
            </div>
            <button>
                <Link href={props.link} target='_blank'>Visit Site</Link>
            </button>
        </div>
    )
}