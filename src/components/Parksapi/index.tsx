import React, { useState, useEffect } from 'react';
import styles from './Parksapi.module.css'; 

interface Park {
  parkid: number;
  name: string;
  official: number;
  advisories: string;
  specialfeatures: string;
  facilities: string;
  washrooms: string;
  streetnumber: string;
  streetname: string;
  ewstreet: string;
  nsstreet: string;
  neighbourhoodname: string;
  neighbourhoodurl: string;
  hectare: number;
  googlemapdest: {
    lon: number;
    lat: number;
  };
}

interface ParksApiResponse {
  total_count: number;
  results: Park[];
}

const Parksapi = () => {
    const [parks, setParks] = useState<Park[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState('');
    const [activeParkId, setActiveParkId] = useState<number | null>(null); 
  
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
  
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
      };
      
  
    const handleParkClick = (parkId: number) => {
        setActiveParkId(activeParkId === parkId ? null : parkId);
      };
  
      const filteredParks = parks.filter(park => 
        park.name.includes(filter)
      );
      
  
    return (
      <div>
        <input
          type="text"
          className={styles.filterInput}
          placeholder="Search Park Name..."
          value={filter}
          onChange={handleFilterChange}
        />
        <button 
          className={styles.button}
          onClick={fetchParksData}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
  
        {error && <div className={styles.error}>Error: {error}</div>}
        {!loading && !error && filteredParks.length > 0 && (
          filteredParks.map((park) => (
            <div key={park.parkid} className={styles.park}>
              <h2 className={styles.parkName} onClick={() => handleParkClick(park.parkid)}>
                {park.name}
              </h2>
              {activeParkId === park.parkid && (
                <div>
                  <p>Official: {park.official}</p>
                  <p>Advisories: {park.advisories}</p>
                  <p>Special Features: {park.specialfeatures}</p>
                  <p>Facilities: {park.facilities}</p>
                  <p>Washrooms: {park.washrooms}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default Parksapi;