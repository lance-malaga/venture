import styles from './PageTitle.module.css'

interface IPageTitleProps {
    desc?: string;
}

export default function PageTitle(props:IPageTitleProps) {
    return (
        <div className={styles.title__container}>
            <h1>City Of Vancouver</h1>
            <p>{props.desc}</p>
        </div>
    )
}