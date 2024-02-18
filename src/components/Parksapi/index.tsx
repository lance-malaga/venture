import React, { useState, useEffect } from 'react';
import styles from './Parksapi.module.css';

interface Park {
  parkid: number;
  name: string;
  official: string;
  advisories: string;
  specialfeatures: string;
  facilities: string;
  washrooms: string;
}

interface ParksApiResponse {
  total_count: number;
  results: Park[];
}

const Parksapi = () => {
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('');

  const fetchParksData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/parks/records?limit=20');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ParksApiResponse = await response.json();
      setParks(data.results);
    } catch (err) {
      console.error('Error fetching parks data:', err);
      setError('Failed to fetch parks data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParksData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = () => {

  };

  const applyFilter = (feature: string) => {
    setActiveFilter(activeFilter === feature ? '' : feature);
  };

  const filteredParks = parks.filter(park => {
    const matchesSearchTerm = park.name.includes(searchTerm);
    const matchesFeatureFilter = activeFilter ? park[activeFilter as keyof Park] === 'Y' : true;
    return matchesSearchTerm && matchesFeatureFilter;
  });

  return (
    <div>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search Park Name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={performSearch} className={styles.searchButton}>Search</button>

      <div className={styles.filterButtons}>
        {['official', 'advisories', 'specialfeatures', 'facilities', 'washrooms'].map((feature) => (
          <button
            key={feature}
            className={`${styles.filterButton} ${activeFilter === feature ? styles.activeFilter : ''}`}
            onClick={() => applyFilter(feature)}
          >
            {feature.charAt(0).toUpperCase() + feature.slice(1)}
          </button>
        ))}
      </div>

      {error && <div className={styles.error}>Error: {error}</div>}

      {loading ? (
        <p>Loading parks...</p>
      ) : (
        filteredParks.map((park) => (
          <div key={park.parkid} className={styles.park}>
            <h2 className={styles.parkName}>{park.name}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Parksapi;
