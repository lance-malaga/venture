import styles from '@/styles/Home.module.css'

// components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import PageTitle from '@/components/PageTitle';
import ChooseCity from '@/components/ChooseCity';
import Link from 'next/link';


export default function Home() {
	return (
		<>
			<CustomHead name={'Home Page'}/>
			<div className={styles.home__container}>
				<div className={styles.content__container}>
					<Header/>
					<main>
						<PageTitle desc={`Welcome to Venture! Explore Vancouver's diverse neighborhoods to find the perfect match for your lifestyle.`}/>
						<Link href="/test">
							test
						</Link>
						<ChooseCity/>
					</main>
				</div>
			</div>
			<Footer/>
		</>		
	)
}
