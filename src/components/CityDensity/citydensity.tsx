import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CityDensityProps {
  selectedOption: string;
}

const CityDensity: React.FC<CityDensityProps> = ({ selectedOption }) => {
  const [cityData, setCityData] = useState<any>({});
  const [showCompareImage, setShowCompareImage] = useState<boolean>(false);

  useEffect(() => {    
    fetch('/data/citydata.json')
      .then(response => response.json())
      .then(data => {       
        const matchedData = data.find((item: any) => item["Region Name"] === selectedOption);
        setCityData(matchedData || {});
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, [selectedOption]);

  const getImagePath = (cityName: string) => {
    return `/images/citiesdensity/density-${cityName.toLowerCase()}.png`;
  };

  const getCompareImagePath = (cityName: string) => {
    return `/images/citiesdensity/desity-compare.png`;
  };

  const toggleImage = () => {
    setShowCompareImage(prevState => !prevState);
  };

  return (
    <div className='flex flex-col md:flex-row gap-10'>
        <div style={{ width: '390px', height: '636px', border: '2px solid black', padding: '20px' , marginTop:'10px'}}>
            <div className="text-xl font-bold uppercase">{selectedOption}</div>
            <div style={{ width: '60px', height: '5px', backgroundColor: 'black', marginTop: '5px'}}></div>
                {Object.keys(cityData).length > 0 &&
                    <>
                        <div className="text-l uppercase"
                             style={{marginTop: '25%'}}>
                          Population in 2021
                        </div>
                        <div
                             style={{
                              fontWeight: 700,
                              fontSize: '64px',
                              lineHeight: '78px',
                              letterSpacing: '0.1em',
                              color: '#C73E1D'                         
                             }}>
                          {cityData["Population"].toLocaleString('en-US')}
                        </div>
                        <div className='mt-5'>
                        The city of {cityData["Region Name"]} is located in an area of {cityData["Area (sq km)"]} square kilometers. It has a population of {cityData["Population"].toLocaleString('en-US')}, with {cityData["Dwellings"].toLocaleString('en-US')} dwellings and {cityData["Households"].toLocaleString('en-US')} households. As of 2021, the population density is {cityData["v_CA21_6: Population density per square kilometre"]} people per square kilometre. The population has grown by {cityData["v_CA21_3: Population percentage change, 2016 to 2021"]}% since 2016.
                        </div>
                        <button onClick={toggleImage} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Compare All City Density</button>
                    </>
                 }
        </div>
        <div style={{marginTop: '10px'}}>
            <Image 
                src={showCompareImage ? getCompareImagePath(selectedOption) : getImagePath(selectedOption)}
                alt={`density-${selectedOption}`}
                width={860}
                height={640}
            />
        </div>        
    </div>
  );
};

export default CityDensity;
