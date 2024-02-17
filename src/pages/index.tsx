import React, { useState } from 'react';
import styles from '@/styles/Home.module.css';

// components
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import CustomHead from '@/components/CustomHead';
import PageTitle from '@/components/PageTitle';
import ChooseCity from '@/components/ChooseCity';

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

export default function Home() {
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

  return (
    <>
      <CustomHead name={'Home Page'}/>
      <div className={styles.home__container}>
        <div className={styles.content__container}>
          <Header/>
          <main>
            <PageTitle desc={`Welcome to Venture! Explore Vancouver's diverse neighborhoods to find the perfect match for your lifestyle.`}/>
            <button 
              className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={fetchParksData}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load Parks Data'}
            </button>

            {error && <div className="text-red-600">Error: {error}</div>}
            {!loading && !error && parks.length > 0 && (
              parks.map((park) => (
                <div key={park.parkid} className="bg-gray-200 m-2 p-4 rounded shadow-lg">
                  <h2 className="font-bold text-lg">{park.name}</h2>
                  {}
                </div>
              ))
            )}
            <ChooseCity/>
          </main>
        </div>
      </div>
      <Footer/>
    </>
  );
}
