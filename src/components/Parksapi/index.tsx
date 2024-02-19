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
}

const CityParkInfo: React.FC<CityParkInfoProps> = ({ city, parks }) => {
  return (
    <div className={styles.cityInfoBox}>
      <h3>
        {city} Parks 
      </h3>
      <div className={styles.parkDetails}>
        <span className={styles.green5}>05</span>
        <Image
          src="/images/parks/tree.png" 
          alt="tree"
          width={100}
          height={100}
        />
      </div>
      <ul className={styles.parksList}>
        {parks.map((park, index) => (
          <li key={index}>{park.park}</li>
        ))}
      </ul>
    </div>
  );
};

const Parksapi = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Vancouver');
  const [parks, setParks] = useState<Park[]>(localParksData);

  useEffect(() => {
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
        setParks(prevParks => [...prevParks, ...parksData]);
      } catch (err) {
        console.error('Error fetching parks data:', err);
      }
    };

    fetchParksData();
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  const cities = Array.from(new Set(parks.map(park => park.city)));

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
      <CityParkInfo city={selectedCity} parks={filteredParks} />
    </div>
  );
};

export default Parksapi;
