import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './DoughnutChart.module.css'
import { statData } from '@/data/stat';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart() {
    const data = {
        labels: [],
        datasets: [
            {
                label: '',
                data: statData.map(item => item.rent),
                backgroundColor: statData.map(item => item.color),
                borderColor: 'transparent',
            },
        ],
    }
    
    return (
        <div className={styles.doughnut__container}>
            <Doughnut data={data} />
        </div>
    )
}