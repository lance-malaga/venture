import styles from '@/styles/Statistics.module.css'

// components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import PageTitle from '@/components/PageTitle';
import ChooseCity from '@/components/ChooseCity';
import DoughnutChart from '@/components/DoughnutChart';
import { statData } from '@/data/stat';

export default function Statistics() {
	return (
		<>
			<CustomHead name={'Statistics Page'}/>
			<div className={styles.stat__container}>
				<div className={styles.content__container}>
					<Header/>
					<main>
						<PageTitle/>
                        <div className={styles.stat__content}>
                            <div className={styles.stat__info}>
                                <div>
                                    <h5>AVG. RENT COMPARISON</h5>
                                    <hr/>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate alias numquam cum dolor ipsa.</p>
                                </div>
                                <div className={styles.legend__container}>
                                    {statData.map((item, index) => (
                                        <div key={index} className={styles.legend}>
                                            <div className={styles.color__block} style={{backgroundColor: item.color}}/>
                                            <p>{item.city}</p>
                                            <p>${item.rent}</p>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                            <DoughnutChart/>
                        </div>
					</main>
				</div>
			</div>
			<Footer/>
		</>		
	)
}
