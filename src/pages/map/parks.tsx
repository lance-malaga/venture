import React, { useState, useEffect } from 'react';
import { parks as localParksData } from '@/data/parks';
import styles from '@/styles/Parks.module.css';
import Image from 'next/image';
import Footer from "@/components/Footer";
import CustomHead from "@/components/CustomHead";
import Header from "@/components/Header";
import MapFilter from '@/components/Mapfilter/mapfilter';
import PageTitle from '@/components/PageTitle';

interface Park {
  park: string;
  city: string;
}


const cityDescriptions: { [key: string]: string } = {
  Vancouver: 'Vancouvers parks blend urban vitality with natural splendor, offering a variety of green spaces for relaxation and adventure, including majestic skyline views and hidden trails. These urban oases are family-friendly, providing educational opportunities and highlighting the ecological diversity of the region. The citys dedication to nature is evident in the well-preserved shorelines and mountain vistas that are easily accessible to all.',
  Burnaby: 'Burnabys parks are urban sanctuaries with tranquil lakes, dense forests, and ample recreational spaces that invite residents to connect with nature. The extensive trail systems and family-friendly facilities underscore the citys commitment to environmental preservation and community engagement. These green spaces serve as vital habitats for wildlife, balancing urban development with natural beauty.',
  Richmond: 'Richmonds parks celebrate the citys cultural heritage and natural beauty, with scenic spots like Garry Point Park for picnics and Iona Beach for birdwatching. These diverse green spaces offer walking paths, wildlife viewing, and educational experiences in local ecology. Richmond is an ideal locale for those seeking outdoor activities and peaceful retreats.',
  WestVan: 'West Vancouvers parks offer a serene blend of sandy beaches, historic sites, and adventurous trails, showcasing the harmony between land and sea. The picturesque coastline and mountainous backdrops provide a tranquil setting for relaxation and family-friendly activities. The citys commitment to preserving its natural landscapes offers residents and visitors a peaceful escape into nature.',
  Surrey: 'Surreys parks, such as the tranquil Holland Park and expansive Surrey Bend Regional Park, offer a green escape for all. With Bear Creek Parks ecosystems, Fleetwood Parks gardens, and Blackie Spit Parks waterfront views, the city showcases a commitment to accessible outdoor spaces. Tynehead Park and Unwin Park cater to nature enthusiasts and families seeking adventure and relaxation in Surreys natural beauty.',
  NewWest: 'New Westminsters parks blend historical charm with verdant landscapes, providing urban oases for leisure and recreation along the Fraser River. The parks offer a variety of activities amidst lush gardens and scenic walks, reflecting the cits appreciation for its heritage and the environment. Here, community and nature come together, offering a place to connect with both history and modern urban living.',
  Delta: 'Deltas parks, where the Fraser River meets the sea, showcase the regions ecological diversity with beachfronts and wetlands serving as gateways to nature. These spaces promote outdoor living and environmental stewardship, offering recreational and educational experiences. Deltas commitment to preserving its natural landscapes ensures a vibrant, healthy setting for community engagement and discovery.',
  Coquitlam: 'Coquitlams parks are vibrant community hubs set against the backdrop of the regions natural splendor, supporting a strong commitment to outdoor living. These green spaces are filled with activity, from picnic gatherings to extensive trail networks, ensuring theres something for everyone. Coquitlams parks serve as a testament to the citys dedication to recreational and natural spaces. ',

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
  const [parks, setParks] = useState<Park[]>([{ park: 'Stanley Park', city: 'Vancouver' }]); 
  const cityDescription = cityDescriptions[selectedCity] || 'Description for this city is not available.';

  return (
    <div>
       <Header />
       <CustomHead/>
       <PageTitle />
      <div className={styles.dropdownWrapper}>
        <label htmlFor="city-select" className={styles.dropdownLabel}>CITY:</label>
        
        <select
          id="city-select"
          value={selectedCity}
          onChange={handleCityChange}
          className={styles.citySelect}
        >
          {Object.keys(cityDescriptions).map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>

          ))}
        </select>
      </div>
      <div className={styles.cityInfoContainer} data-testid="city-info-container">
        <div className={styles.parkDetailsContainer}>
          <h3 className={styles.cityParksTitle}>{selectedCity} Parks</h3>
          <span className={styles.greenNumber}>{parksToShow.length.toString().padStart(2, '0')}</span>
          <Image
            src="/images/parks/tree.png"
            alt="tree"
            width={100}
            height={100}
          />
          <p className={styles.cityDescription}>{cityDescription}</p>
          <ul className={styles.parksList}>
            {parksToShow.map((park, index) => (
              <li key={index}>{park.park}</li>
            ))}
          </ul>
        </div>
        <div className={styles.mapContainer}>
        <MapFilter />
          <Image
            src={parkImageSrc}
            alt={`${selectedCity} park map`}
            layout="responsive"
            width={200}  
            height={250}
            className={styles.imageStyle} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Parksapi;
