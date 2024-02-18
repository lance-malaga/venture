import React, { useState, useEffect } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import PageTitle from '@/components/PageTitle';
import ChooseCity from '@/components/ChooseCity';
import styles from '@/styles/Home.module.css';

export default function Home() {
    const [selectedCity, setSelectedCity] = useState("");
    const [costData, setCostData] = useState(null);

    const citiesRent = [
        {
            city: 'Vancouver',
            image: '/images/citiesRent/avg-rent-vancouver.png',
        },
        {
            city: 'Burnaby',
            image: '/images/citiesRent/avg-rent-burnaby.png',
        },
        {
            city: 'New-Westminster',
            image: '/images/citiesRent/avg-rent-new-west.png',
        },
        {
            city: 'Surrey',
            image: '/images/citiesRent/avg-rent-surrey.png',
        },
        {
            city: 'Coquitlam',
            image: '/images/citiesRent/avg-rent-coquitlam.png',
        },
        {
            city: 'Richmond',
            image: '/images/citiesRent/avg-rent-richmond.png',
        },
    ];

    const areas: string[] = [
        'Vancouver', 'Burnaby', 'New-Westminster', 'Surrey',
        'Coquitlam', 'Richmond'
    ];

    useEffect(() => {
        if (selectedCity) {
            const url = `https://cities-cost-of-living-and-average-prices-api.p.rapidapi.com/cost_of_living?country=canada&city=${selectedCity}`;

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'cc25ca9ee5mshf78d008f05351a7p17dba0jsn348f8362fd83',
                    'X-RapidAPI-Host': 'cities-cost-of-living-and-average-prices-api.p.rapidapi.com'
                }
            };

            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    setCostData(response);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [selectedCity]);

    const handleChange = (event: any) => {
        setSelectedCity(event.target.value);
    };

    return (
        <>
            <CustomHead name={'avg-rent'}/>
            <div className={styles.home__container}>
                <div className={styles.content__container}>
                    <Header />
                    <main>
                        <PageTitle title={selectedCity }desc={`Welcome to Venture! Explore ${selectedCity}'s diverse neighborhoods to find the perfect match for your lifestyle.`}/>
                        <div>
                            <label htmlFor="cities">Select a city:</label>
                            <select id="cities" name="cities" value={selectedCity} onChange={handleChange}>
                                <option value="">Select</option>
                                {areas.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            {selectedCity && costData && (
                                <div>
                                    {citiesRent
                                        .filter(cityData => cityData.city === selectedCity)
                                        .map(cityData => (
                                            <img key={cityData.city} src={cityData.image} alt={`Image of ${selectedCity}`} />
                                        ))
                                    }
                                    <h2>Cost of Living in {costData["City Name"]}, {costData["Country Name"]}</h2>
                                    <div>
                                        <h2>Cost of Living in {costData["Cost of Living Month Total"]}</h2>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </>
    )
}
