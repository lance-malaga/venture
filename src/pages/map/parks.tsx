import React, { useState, useEffect } from 'react';
import { parks as localParksData } from '@/data/parks';
import styles from '@/styles/Parks.module.css';
import Image from 'next/image';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface Park {
  park: string;
  city: string;
}


const cityDescriptions: { [key: string]: string } = {
  Vancouver: 'Vancouver is enveloped in a landscape where urban vitality meets natural splendor, offering a diverse array of green spaces that cater to every inclination. The cities parks serve as urban oases, providing serene retreats with majestic skyline views and intimate spaces for quiet reflection or picnics. Adventure seekers find solace in the hidden trails that weave through dense forests, leading to unexpected natural wonders within the citys limits. Family-friendly areas dot the landscape, offering a mix of recreational activities and educational opportunities that highlight the regions ecological diversity. The intertwining of rugged shorelines and panoramic vistas of the surrounding mountains and ocean exemplifies Vancouvers dedication to preserving its breathtaking natural environment. This commitment ensures that both locals and visitors can immerse themselves in tranquil escapes and invigorating outdoor experiences right at the cities doorstep.',
  Burnaby: 'Burnaby, nestled amidst the bustling metropolis of Greater Vancouver, is a city where lush parks and natural reserves flourish, offering a green reprieve to its urban landscape. Its parks are a mosaic of tranquil lakes, dense forests, and sprawling recreational fields, providing a serene backdrop for residents and visitors to unwind, explore, and connect with nature. The cities extensive trail systems invite adventurous spirits to hike, bike, and wander through scenic routes that showcase Burnabys diverse flora and fauna. Family-friendly spaces abound, equipped with playgrounds, picnic areas, and sports facilities, catering to a wide array of interests and activities. These green spaces not only offer recreational opportunities but also serve as vital habitats for wildlife, emphasizing Burnabys commitment to environmental preservation and sustainability. As a community hub, Burnabys parks embody the citys dedication to balancing urban development with the natural world, ensuring that the beauty of the outdoors is accessible to all who seek solace and inspiration in natures embrace.',
  Richmond: 'Richmond, BC, is adorned with parks that reflect the cities rich blend of cultural heritage and natural splendor. Garry Point Park, with its sweeping views of the Fraser River, is perfect for picnics and kite flying. Minoru Park, a peaceful retreat amidst the urban landscape, offers walking paths and wildlife watching. For those seeking a touch of nature, Iona Beach Regional Park provides a unique seaside experience with its long jetty and birdwatching opportunities. Richmond Nature Park and Terra Nova Rural Park showcase the areas ecological diversity, inviting visitors to explore and learn about local flora and fauna. These parks, along with the scenic Middle Arm Waterfront Greenway, make Richmond a cherished destination for outdoor enthusiasts and families looking for serene escapes and recreational activities..',
  WestVan: 'West Vancouver is a haven of natural beauty, where the serene harmony between land and sea is vividly on display. Here, sandy beaches offer peaceful retreats with stunning views of the city skyline, while secluded rocky shores invite quiet picnics and introspection. For the adventurous at heart, hidden gems with cascading waterfalls and lush forest trails provide a perfect backdrop for hikes that promise solace and rejuvenation. Family-friendly beaches and historic sites offer both recreational activities and a glimpse into the areas rich heritage. The rugged coastline, with its breathtaking vistas of the Pacific Ocean, underscores the citys commitment to preserving its natural landscapes, providing residents and visitors a tranquil escape into the heart of nature.',
  Surrey: 'Surreys parks, such as the tranquil Holland Park and expansive Surrey Bend Regional Park, offer a green escape for all. With Bear Creek Parks ecosystems, Fleetwood Parks gardens, and Blackie Spit Parks waterfront views, the city showcases a commitment to accessible outdoor spaces. Tynehead Park and Unwin Park cater to nature enthusiasts and families seeking adventure and relaxation in Surreys natural beauty.',
  NewWest: 'New Westminster, nestled along the banks of the majestic Fraser River, marries historical charm with verdant landscapes, offering a collection of parks that are as rich in history as they are in natural beauty. These urban oases provide a tranquil escape from city life, featuring lush gardens, meandering pathways, and scenic riverfront walks that invite leisurely strolls and moments of contemplation. Adventure seekers and families alike find delight in the abundant green spaces that host a variety of recreational activities, from playgrounds to sports fields, ensuring theres something for everyone. The cities commitment to its parks underscores a deep appreciation for both heritage and the environment, creating welcoming spaces where the community can gather, play, and relax. In New Westminster, every park tells a story, weaving the fabric of the cities past with the vibrant threads of modern urban living, offering residents and visitors a place to connect with nature and history in equal measure.',
  Delta: 'Delta, where the Fraser River meets the sea, is a tapestry of natural landscapes, woven with parks that celebrate the regions rich ecological diversity and agricultural heritage. These parks serve as gateways to exploring the areas unique ecosystems, offering everything from serene beachfronts to lush, protected wetlands. Nature enthusiasts are drawn to trails that wind through forests and along riverbanks, revealing Deltas abundant wildlife and birdlife, making it a haven for birdwatchers and conservationists. Family-friendly spaces provide a blend of recreational and educational experiences, fostering a community spirit centered around outdoor living and environmental stewardship. Deltas parks are more than just green spaces; they are community anchors that promote a healthy, active lifestyle and a deep connection to the natural world. The commitment to preserving these environments ensures that Delta remains a place where the beauty of the British Columbia landscape can be experienced up close, offering a tranquil retreat from urban life and a vibrant setting for adventure, relaxation, and discovery.',
  Coquitlam: 'Coquitlam, nestled in the heart of Metro Vancouver, boasts a rich tapestry of parks that are both a tribute to the regions natural beauty and a testament to the communitys commitment to outdoor living. The parks in Coquitlam are not merely green spaces but vibrant hubs of activity where families gather for picnics, fitness enthusiasts traverse the extensive trail networks, and children revel in the imaginative play areas. ',

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


  const cityDescription = cityDescriptions[selectedCity] || 'Description for this city is not available.';

  return (
    <div>
       <Header />
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
      <div className={styles.cityInfoContainer}>
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
