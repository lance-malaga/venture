import styles from '@/styles/Home.module.css'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';

export default function Home() {
	return (
		<>
			<CustomHead name={'Home Page'}/>
			<div className={styles.home__container}>
				<div className={styles.content__container}>
					<Header/>
					<main>
						<div className={styles.title__container}>
							<h1>City Of Vancouver</h1>
							<p>Welcome to Venture! Explore Vancouver's diverse neighborhoods to find the perfect match for your lifestyle.</p>
						</div>
						<div>

						</div>
					</main>
				</div>
			</div>
			<Footer/>
		</>		
	)
}
