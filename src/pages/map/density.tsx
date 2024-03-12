import styles from '@/styles/Home.module.css'

// components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import CityFilter from '@/components/Cityfilter/cityfilter';
import CityDensity from '@/components/CityDensity/citydensity';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import MapFilter from '@/components/Mapfilter/mapfilter';
//map filter here


export default function Density() {
    const [selectedOption, setSelectedOption] = useState<string>('Vancouver');
	

    const handleSelect = (selectedValue: string) => {
      setSelectedOption(selectedValue);
    };
	return (
		<>
			<CustomHead name={'Map Density'}/>
			<div className={styles.home__container}>
				<div className={styles.content__container}>
					<Header/>
					<main>
						<PageTitle title={selectedOption }/>
						<div className='flex flex-row gap-10'>
							<CityFilter  
                        		options={['Vancouver', 'Burnaby', 'Coquitlam', 'Richmond', 'Delta', 'Surrey', 'New Westminster', 'West Vancouver']}
                        		onSelect={handleSelect} />
							<MapFilter />

						</div>
                        
                        <CityDensity selectedOption={selectedOption} />
                       
						
					</main>
				</div>
			</div>
			<Footer/>
		</>		
	)
}
