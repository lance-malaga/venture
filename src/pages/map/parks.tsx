import React, { useState, useEffect } from 'react';
import { parks as localParksData } from '@/data/parks';
import styles from '@/styles/Parks.module.css';
import Image from 'next/image';

interface Park {
  park: string;
  city: string;
}

interface CityParkInfoProps {
  city: string;
  parks: Park[];
  parkImageSrc: string;
  parkCount: number;
  treeImageSrc: string;
  
}

const CityParkInfo: React.FC<CityParkInfoProps> = ({ city, parks, parkImageSrc, treeImageSrc, parkCount }) => {
    return (
      <div className={styles.cityInfoContainer}>
        <div className={styles.parkDetailsContainer}>
          <h3 className={styles.cityParksTitle}>{city} Parks</h3>
          <span className={styles.greenNumber}>{parkCount.toString().padStart(2, '0')}</span>
          <Image
          src="/images/parks/tree.png"
          alt="tree"
          width={100}
          height={100}
        />
          
          <ul className={styles.parksList}>
            {parks.map((park, index) => (
              <li key={index}>{park.park}</li>
            ))}
          </ul>
        </div>
        <div className={styles.mapContainer}>
          <Image
            src={parkImageSrc}
            alt={`${city} park map`}
            layout="responsive"
            width={200}  
            height={250} 
          />
        </div>
      </div>
      
    );
};

const Parksapi = () => {
  const [selectedCity, setSelectedCity] = useState<string>('Vancouver');
  const [vancouverParks, setVancouverParks] = useState<Park[]>([]);
  const [parkImageSrc, setParkImageSrc] = useState<string>('/images/parks/parks-vancouver.png');

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
          <option value="Vancouver">Vancouver</option>
          {localParksData.map((cityData, index) => (
            <option key={index} value={cityData.city}>
              {cityData.city}
            </option>
          ))}
        </select>
      </div>
      <CityParkInfo city={selectedCity} parks={parksToShow} parkImageSrc={parkImageSrc} parkCount={parksToShow.length}  treeImageSrc="/tree.png"/>
    </div>
  );
};

export default Parksapi;
