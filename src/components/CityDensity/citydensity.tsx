import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import densityMap from '../../../public/images/density-map-frame.png'

interface CityDensityProps {
  selectedOption: string;
}

const CityDensity: React.FC<CityDensityProps> = ({ selectedOption }) => {
  const [cityData, setCityData] = useState<any>({});

  useEffect(() => {    
    fetch('/citydata/citydata.json')
      .then(response => response.json())
      .then(data => {       
        const matchedData = data.find((item: any) => item["Region Name"] === selectedOption);
        setCityData(matchedData || {});
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }, [selectedOption]);

  return (
    <div className='flex flex-row gap-10'>
        <div style={{ width: '390px', height: '640px', border: '2px solid black', padding: '20px' , marginTop:'10px'}}>
            <div className="text-xl font-bold uppercase">{selectedOption}</div>
            <div style={{ width: '60px', height: '5px', backgroundColor: 'black', marginTop: '5px'}}></div>
                {Object.keys(cityData).length > 0 &&
                    <>
                        <div className="text-l">Population: {cityData["Population"]}</div>
                        <div className="text-l">Population Density (per square kilometre): {cityData["v_CA21_6: Population density per square kilometre"]}</div>
                    </>
                 }
        </div>
        <div style={{marginTop: '10px'}}>
            <Image 
                src={densityMap}
                alt='density-map'
                width={860}
                height={640}
            />
        </div>        
    </div>
    
  );
};

export default CityDensity;
