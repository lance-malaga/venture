import styles from './PageTitle.module.css'

interface IPageTitleProps {
    title?: string;
    desc?: string;
}

export default function PageTitle(props:IPageTitleProps) {
    return (
        <div className={styles.title__container}>
            <h1>City Of {props.title ? props.title : 'Metro Vancouver'  }</h1>
            <p>{props.desc}</p>
        </div>
    )
}