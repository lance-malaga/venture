import styles from '@/styles/Home.module.css'

// components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import Link from 'next/link';
import CityFilter from '@/components/Cityfilter/cityfilter';
import CityDensity from '@/components/CityDensity/citydensity';
import { useState } from 'react';


export default function test() {
    const [selectedOption, setSelectedOption] = useState<string>('Vancouver');

    const handleSelect = (selectedValue: string) => {
      setSelectedOption(selectedValue);
    };
	return (
		<>
			<CustomHead name={'Test Page'}/>
			<div className={styles.home__container}>
				<div className={styles.content__container}>
					<Header/>
					<main>
                        <CityFilter  
                        options={['Vancouver', 'Burnaby', 'Coquitlam', 'Richmond', 'Delta', 'Surrey', 'New Westminster', 'West Vancouver']}
                        onSelect={handleSelect} />
                        <CityDensity selectedOption={selectedOption} />
                       
						
					</main>
				</div>
			</div>
			<Footer/>
		</>		
	)
}
