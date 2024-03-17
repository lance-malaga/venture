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
                                    <p>
                                        Average rent prices can vary depending on factors such as location, housing type, and market conditions. However, here are approximate average rent prices for 1-bedroom apartments in the Metro Vancouver area as of 2022:
                                    </p>
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
