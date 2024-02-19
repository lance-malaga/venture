import React, { useState, useEffect } from 'react';
import { parks as localParksData } from '@/data/parks';
import styles from './Parksapi.module.css';
import Image from 'next/image';

interface Park {
  park: string;
  city: string;
}

interface CityParkInfoProps {
  city: string;
  parks: Park[];
  parkImageSrc: string;
}

const CityParkInfo: React.FC<CityParkInfoProps> = ({ city, parks, parkImageSrc }) => {
    return (
      <div className={styles.cityInfoContainer}>
        <div className={styles.parkCounterContainer}>
          <span className={styles.green5}>05</span>
          <Image
            src="/images/parks/tree.png"
            alt="tree"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.parkDetailsContainer}>
          <h3>{city} Parks</h3>
          <ul className={styles.parksList}>
            {parks.map((park, index) => (
              <li key={index}>{park.park}</li>
            ))}
          </ul>
        </div>
        <div className={styles.cityImageContainer}>
          <Image
            src={parkImageSrc}
            alt={`${city} park`}
            width={200} 
            height={200}
            layout="responsive"
          />
        </div>
      </div>
    );
  };
  
  
const Parksapi = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Vancouver');
  const [parks, setParks] = useState<Park[]>([]);
  const [parkImageSrc, setParkImageSrc] = useState<string>('/images/parks/parks-vancouver.png');

  useEffect(() => {
 
    if (selectedCity === 'Vancouver') {
      const fetchParksData = async () => {
        try {
          const response = await fetch('https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/parks/records?limit=20');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const apiData = await response.json();
          const parksData: Park[] = apiData.results.map((record: any) => ({
            park: record.name,
            city: 'Vancouver',
          }));
          setParks([...localParksData, ...parksData]);
        } catch (err) {
          console.error('Error fetching parks data:', err);
        }
      };
      fetchParksData();
    } else {
     
      setParks(localParksData.filter(park => park.city === selectedCity));
    }
  }, [selectedCity]);

  useEffect(() => {
   
    const imageName = `parks-${selectedCity.toLowerCase().replace(/ /g, '-')}.png`;
    setParkImageSrc(`/images/parks/${imageName}`);
  }, [selectedCity]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

 
  const cities = Array.from(new Set([...localParksData.map(park => park.city), 'Vancouver']));
  const filteredParks = parks.filter(park => park.city === selectedCity);

  return (
    <div>
      <div className={styles.dropdownWrapper}>
        <label htmlFor="city-select" className={styles.dropdownLabel}>CITY:</label>
        <select
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
          className={styles.citySelect}
        >
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <CityParkInfo city={selectedCity} parks={filteredParks} parkImageSrc={parkImageSrc} />
    </div>
  );
};

export default Parksapi;
