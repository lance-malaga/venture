import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './CityDensity.module.css'

interface CityDensityProps {
  selectedOption: string;
}

const CityDensity: React.FC<CityDensityProps> = ({ selectedOption }) => {
  const [cityData, setCityData] = useState<any>({});
  const [showCompareImage, setShowCompareImage] = useState<boolean>(false);
  const [showCityData, setShowCityData] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>("Compare Cities");

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
    return `/images/citiesdensity/density-compare.png`;
  };

  const toggleImage = () => {
    setShowCompareImage(prevState => !prevState);
    setShowCityData(prevState => !prevState);
    setButtonText(prevState => prevState === "Compare Cities" ? "Go Back" : "Compare Cities");
  };

  return (
    <div className={styles.city_density_container}>
      <div className={styles.city_density_info}>
        {showCityData ? (
          <>
            <div className="text-xl font-bold uppercase">{selectedOption}</div>
            <div style={{ width: '60px', height: '5px', backgroundColor: 'black', marginTop: '5px' }}></div>
            {Object.keys(cityData).length > 0 && (
              <div className={styles.city_density_txt}>
                <div>
                  <div className="text-l uppercase" style={{ marginTop: '25%' }}>Population in 2021</div>
                  <div style={{ fontWeight: 700, fontSize: '64px', lineHeight: '78px', letterSpacing: '0.1em', color: '#C73E1D' }}>
                    {cityData["Population"].toLocaleString('en-US')}
                  </div>

                </div>

                <div className='mt-5'>
                  The city of {cityData["Region Name"]} is located in an area of {cityData["Area (sq km)"]} square kilometers. It has a population of {cityData["Population"].toLocaleString('en-US')}, with {cityData["Dwellings"].toLocaleString('en-US')} dwellings and {cityData["Households"].toLocaleString('en-US')} households. As of 2021, the population density is {cityData["v_CA21_6: Population density per square kilometre"]} people per square kilometre. The population has grown by {cityData["v_CA21_3: Population percentage change, 2016 to 2021"]}% since 2016.
                </div>

              </div>
            )}
          </>
        ) : (
          <div>
            <div className="text-xl font-bold uppercase">DENSITY COMPARISON</div>
            <div style={{ width: '60px', height: '5px', backgroundColor: 'black', marginTop: '5px', marginBottom: '10px' }}></div>

            <div className={styles.city_compare_info}>
              <p>Vancouver, along with cities like Surrey and Richmond, forms a dynamic urban area with a population over one million. Vancouver leads with about 662,000 residents, while Surrey and Richmond add to the diverse makeup of the region, each with populations exceeding 200,000.</p>
              <div style={{ marginTop: '5px' }}>
                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#280C06', marginTop: '5px' }}></div>
                  <div>VANCOUVER</div>
                  <div>662,248</div>
                </div>
                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#50190C', marginTop: '5px' }}></div>
                  <div>SURREY</div>
                  <div>568,322</div>
                </div>

                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#772511', marginTop: '5px' }}></div>
                  <div>BURNABY</div>
                  <div>249,125</div>
                </div>

                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#9F3217', marginTop: '5px' }}></div>
                  <div>RICHMOND</div>
                  <div>209,937</div>
                </div>

                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#C73E1D', marginTop: '5px' }}></div>
                  <div>COQUITLAM</div>
                  <div>148,625</div>
                </div>
                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#D2654A', marginTop: '5px' }}></div>
                  <div>DELTA</div>
                  <div>108,455</div>
                </div>

                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#E39F8E', marginTop: '5px' }}></div>
                  <div>NEW WEST</div>
                  <div>78,916</div>
                </div>

                <div className='flex flex-row gap-10 justify-between'>
                  <div style={{ width: '50px', height: '8px', backgroundColor: '#F4D8D2', marginTop: '5px' }}></div>
                  <div>WEST VAN</div>
                  <div>44,122</div>
                </div>
              </div>
            </div>





          </div>
        )}
        <button onClick={toggleImage}
          className={styles.city_density_togglebutton}>
          {buttonText}
        </button>
      </div>
      <div style={{ marginTop: '10px' }}>
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
