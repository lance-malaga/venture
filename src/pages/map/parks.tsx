import React, { useState, useEffect } from 'react';
import { parks as localParksData } from '@/data/parks';
import styles from '@/styles/Parks.module.css';
import Image from 'next/image';
import Footer from "@/components/Footer";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/Header";
import MapFilter from '@/components/Mapfilter/mapfilter';
import PageTitle from '@/components/PageTitle';
import ParksLayout from '@/components/ParksLayout';
import TitleSection from '@/components/TitleSection';
import CityFilter from '@/components/Cityfilter/cityfilter';

interface Park {
  park: string;
  city: string;
}


const cityDescriptions: { [key: string]: string } = {
  Vancouver: `Vancouver's parks blend urban vitality with natural splendor, offering a variety of green spaces for relaxation and adventure, including majestic skyline views and hidden trails.`,
  Burnaby: `Burnaby's green spaces serve as vital habitats for wildlife, balancing urban development with natural beauty.`,
  Richmond: `Richmond's parks celebrate the citys cultural heritage and natural beauty, with scenic spots like Garry Point Park for picnics and Iona Beach for birdwatching.`,
  WestVan: `West Vancouver's parks offer picturesque coastlines and mountainous backdrops, providing a tranquil setting for relaxation and family-friendly activities.`,
  Surrey: `Surrey's parks, such as the tranquil Holland Park and expansive Surrey Bend Regional Park, offer a green escape for all nature enthusiasts and families seeking adventure and relaxation.`,
  NewWest: `New Westminster parks blend historical charm with verdant landscapes, providing urban oases for leisure and recreation along the Fraser River.`,
  Delta: `Deltas parks, where the Fraser River meets the sea, showcase the regions ecological diversity with beachfronts and wetlands serving as gateways to nature.`,
  Coquitlam: `Coquitlam's green spaces are filled with activity, from picnic gatherings to extensive trail networks, ensuring theres something for everyone.`,
  
};

const Parksapi = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Vancouver');
  const [vancouverParks, setVancouverParks] = useState<Park[]>([]);
  const [parkImageSrc, setParkImageSrc] = useState<string>('/images/parks/parks-vancouver.png');
  
  const vancouverPark = {
    name: 'Stanley Park',
    desc: 'Stanley Park, a jewel in Vancouvers urban landscape, is a sprawling 400-hectare oasis of towering forests, scenic coastlines, and cultural landmarks. This vibrant green space, bordered by the famous Seawall, offers a refuge of natural beauty and historical significance, making it a beloved escape for both locals and visitors seeking solace from the cities hustle.',
    image: '/images/popular-parks/vancouver-stanley.png',
    link: `https://maps.app.goo.gl/WJPinT86HpHP3dhV7`,
  }
  
  useEffect(() => {
    if (selectedCity === 'Vancouver') {
      const fetchVancouverParks = async () => {
        try {
          const response = await fetch('https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/parks/records?limit=5');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const apiData = await response.json();
          if (apiData && apiData.results) {
            setVancouverParks(apiData.results.map((record: any) => ({
              park: record.name,
              city: 'Vancouver',
            })));
          } else {
            console.error('Unexpected API response structure:', apiData);
          }
        } catch (err) {
          console.error('Error fetching parks data:', err);
          setVancouverParks([]);
        }
      };
      
      fetchVancouverParks();
    }
  }, [selectedCity]);
  
  useEffect(() => {
    const imageName = `parks-${selectedCity.toLowerCase().replace(/ /g, '-')}.png`;
    setParkImageSrc(`/images/parks/${imageName}`);
  }, [selectedCity]);
  
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };
  
  const localCityParks = localParksData.find(group => group.city === selectedCity);
  const localParks = localCityParks ? localCityParks.parks.map(parkName => ({
    park: parkName,
    city: selectedCity,
  })) : [];
  
  const parksToShow = selectedCity === 'Vancouver' ? vancouverParks : localParks;
  const [parks, setParks] = useState<Park[]>([{ park: 'Stanley Park', city: 'Vancouver' }]); 
  const cityDescription = cityDescriptions[selectedCity] || 'Select a city to view the most popular parks.';
  
  console.log(localCityParks)
  
  return (
    <>
      <CustomHead name={'Parks Map'}/>
      <div className={styles.parksHeaderHeader}>
        <Header />
      </div>

      <PageTitle />

      <div className={styles.cityInfoContainer} data-testid="city-info-container">
        <div className={styles.mainContentContainer}>
          <div className={styles.dropdownWrapper}>
            <label htmlFor="city-select" className={styles.dropdownLabel}>CITY:</label>
            <select
              id="city-select"
              value={selectedCity}
              onChange={handleCityChange}
              className={styles.citySelect}
            >
              {/* The "Select a city" option should not be disabled so it can be displayed by default */}
              <option value="">Select a city</option>
              {Object.keys(cityDescriptions).map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <MapFilter />
        </div>

        <div className={styles.mainContentContainer}>
          <div className={styles.parkDetailsContainer}>
            <h3 className={styles.cityParksTitle}>
              {selectedCity} Parks
              <div className={styles.titleUnderline}></div> {}
            </h3>
            <div className={styles.imageContainer}>
              <div>
                <p>PARKS</p>
                <span className={styles.greenNumber}>{parksToShow.length.toString().padStart(2, '0')}</span>
              </div>
              <Image
                src="/images/parks/tree.svg"
                alt="tree"
                width={100}
                height={100}
              />
            </div>
            <p className={styles.cityDescription}>{cityDescription}</p>
            <ul className={styles.parksList}>
              {parksToShow.map((park, index) => (
                <li key={index}>{park.park}</li>
              ))}
            </ul>
          </div>
          <div className={styles.mapContainer}>
            <Image
              src="/images/parks/parks-vancouver.png"
              alt={`${selectedCity} park map`}
              layout="responsive"
              width={200}  
              height={250}
              className={styles.imageStyle} 
            />
          </div>
        </div>
      </div>

      {/* featured parks */}
      <div className={styles.featured_parks}>
        {selectedCity && selectedCity !== "Select a city" && (
          <TitleSection
            title='EXPLORE THE NEIGHBORHOOD'
            desc={`Take a look at one of the most popular parks in ${selectedCity}!`}
          />
        )}
        {
          selectedCity && selectedCity !== "Select a city" && (
              <ParksLayout
                name={selectedCity === 'Vancouver' ? vancouverPark.name : localCityParks?.popularPark.name || ''}
                desc={selectedCity === 'Vancouver' ? vancouverPark.desc : localCityParks?.popularPark.desc || ''}
                link={selectedCity === 'Vancouver' ? vancouverPark.link : localCityParks?.popularPark.link || ''}
                image={selectedCity === 'Vancouver' ? vancouverPark.image : localCityParks?.popularPark.image || ''}
              />
          )
        }        
      </div>
      <Footer />
    </>
  );
};
          
export default Parksapi;
          