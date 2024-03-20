import React, { useState, useEffect } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import PageTitle from '@/components/PageTitle';
import styles from '@/styles/AvgRent.module.css';
import CityFilter from '@/components/Cityfilter/cityfilter';
import RentSiteCard from '@/components/RentSiteCard';
import TitleSection from '@/components/TitleSection';
import Link from 'next/link';
import { rentSiteData } from '@/data/rentSite';

export default function AvgRent() {
    const [selectedCity, setSelectedCity] = useState("Vancouver");
    const [currentPage, setCurrentPage] = useState("avg-rent");
    const [costData, setCostData] = useState(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const citiesRent = [
        {
            city: 'Vancouver',
            image: '/images/citiesRent/avg-rent-vancouver.svg',
            info: 'Rental data is collected from various sources such as real estate agencies, property management companies, online rental platforms, surveys, and government databases. Provided here is the average rent for Vancouver'
        },
        {
            city: 'Burnaby',
            image: '/images/citiesRent/avg-rent-burnaby.svg',
            info: 'Rental data is collected from various sources such as real estate agencies, property management companies, online rental platforms, surveys, and government databases. Provided here is the average rent for Burnaby'
        },
        {
            city: 'New-Westminster',
            image: '/images/citiesRent/avg-rent-new-west.svg',
            info: 'Rental data is collected from various sources such as real estate agencies, property management companies, online rental platforms, surveys, and government databases. Provided here is the average rent for New-Westminster'
        },
        {
            city: 'Surrey',
            image: '/images/citiesRent/avg-rent-surrey.svg',
            info: 'Rental data is collected from various sources such as real estate agencies, property management companies, online rental platforms, surveys, and government databases. Provided here is the average rent for Surrey'
            
        },
        {
            city: 'Coquitlam',
            image: '/images/citiesRent/avg-rent-coquitlam.svg',
            info: 'Rental data is collected from various sources such as real estate agencies, property management companies, online rental platforms, surveys, and government databases. Provided here is the average rent for Coquitlam'
        },
        {
            city: 'Richmond',
            image: '/images/citiesRent/avg-rent-richmond.svg',
            info: 'Rental data is collected from various sources such as real estate agencies, property management companies, online rental platforms, surveys, and government databases. Provided here is the average rent for Richmond'
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
                                    <CityFilter options={areas} onSelect={handleChange}/>
                                </div>
                                
                                <div style={{ width: '390px', height: '640px', border: '2px solid black', padding: '20px' , marginTop:'10px'}}>
                                <div style={{fontWeight: 'bold', fontSize: '20px',textTransform: 'uppercase'}}>{selectedCity}</div>
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
                                        {citiesRent
                                        .filter(cityData => cityData.city === selectedCity)
                                        .map(cityData => (
                                            <div>{cityData.info}</div>
                                        ))
                                    }
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
                                    <div style={{marginBottom: '10px'}}>FILTER BY: <Link href={`/map/avg-rent`} style={{ color: currentPage === "avg-rent" ? "#364EC0" : "inherit", fontWeight: currentPage === "avg-rent" ? "bold" : "normal" }}>AVG. RENT </Link>/ <Link href={`/map/density`}>DENSITY</Link> / <Link href={`/map/parks`}>PARKS</Link></div>
                                    {citiesRent
                                        .filter(cityData => cityData.city === selectedCity)
                                        .map(cityData => (
                                            <img style={{height: '640px'}}key={cityData.city} src={cityData.image} alt={`Image of ${selectedCity}`} />
                                        ))
                                    }
                                </div>
                            )}
                        </div>

                        <div className={styles.rental_site}>
                            <TitleSection
                                title='FIND YOUR NEW HOME'
                                desc={(
                                    <>
                                        Take a look at one of the most trusted apartment rental <br />
                                        websites available in Vancouver. Here’s the list!
                                    </>
                                )}
                            />
                            <div className={styles.rental_site__container}>
                                {rentSiteData.map((item,index) => (
                                    <RentSiteCard
                                        image={item.image}
                                        site={item.site}
                                        desc={item.desc}
                                        link={item.link}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </>
    )
}
