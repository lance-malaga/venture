import styles from './TitleSection.module.css'

export default function TitleSection(props: ITitleSectionProps) {
    return (
        <div className={styles.title_section}>
            <h4>{props.title}</h4>
            <p>{props.desc}</p>
        </div>
    )
}