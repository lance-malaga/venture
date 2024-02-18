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

  const fetchParksData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/parks/records?limit=20');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ParksApiResponse = await response.json();
      if (data.results) {
        setParks(data.results);
      } else {
        setError('No results found in the response');
      }
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

  return (
    <div>
      <button 
        className={styles.button}
        onClick={fetchParksData}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Refresh Parks Data'}
      </button>

      {error && <div className={styles.error}>Error: {error}</div>}
      {!loading && !error && parks.length > 0 && (
        parks.map((park) => (
          <div key={park.parkid} className={styles.park}>
            <h2 className={styles.parkName}>{park.name}</h2>
            {}
          </div>
        ))
      )}
    </div>
  );
};

export default Parksapi;
