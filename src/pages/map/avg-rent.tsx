import React, { useState, useEffect } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import PageTitle from '@/components/PageTitle';
import styles from '@/styles/AvgRent.module.css';
import CityFilter from '@/components/Cityfilter/cityfilter';

export default function AvgRent() {
    const [selectedCity, setSelectedCity] = useState("Vancouver");
    const [costData, setCostData] = useState(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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
                    'X-RapidAPI-Key': apiKey ?? '',
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

    const handleChange = (event: string) => {
        setSelectedCity(event);
    };

    return (
        <>
            <CustomHead name={'avg-rent'}/>
            <div className={styles.home__container}>
                <div className={styles.content__container}>
                    <Header />

                    <main>
                        <PageTitle title={selectedCity }/>
                        <div className={styles.content_body}>

                        <div className={styles.content_filter}>
                            <div>
                                <CityFilter options={areas} onSelect={handleChange} />
                            </div>
                            
                            <div style={{ width: '390px', height: '640px', border: '2px solid black', padding: '20px' , marginTop:'10px'}}>
                            <div style={{fontWeight: 'bold', fontSize: '20px'}}>{selectedCity}</div>
                            <div style={{ width: '60px', height: '5px', backgroundColor: 'black', marginTop: '5px'}}></div>
                                <div className="text-l uppercase"
                                        style={{marginTop: '25%'}}>
                                    AVERAGE RENT
                                    </div>

                                    {costData && (
                                <div className={styles.content_api}>
                                    <h2>{costData["City Name"]}</h2>
                                    {/* <div>
                                        <h2>Cost of Living in {costData["Cost of Living Month Total"]}</h2>
                                    </div> */}
                                </div>
                            )}

                                    <div
                                        style={{
                                        fontWeight: 700,
                                        fontSize: '64px',
                                        lineHeight: '78px',
                                        letterSpacing: '0.1em',
                                        color: '#C73E1D'                         
                                        }}>
                                    </div>
                                    <div className='mt-5'></div>
                            </div>
                        </div>
                        {selectedCity &&  (
                                <div>
                                    <div style={{marginBottom: '10px'}}>FILTER BY:     AVG. RENT / DENSITY / PARKS</div>
                                    {citiesRent
                                        .filter(cityData => cityData.city === selectedCity)
                                        .map(cityData => (
                                            <img style={{height: '640px'}}key={cityData.city} src={cityData.image} alt={`Image of ${selectedCity}`} />
                                        ))
                                    }
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
