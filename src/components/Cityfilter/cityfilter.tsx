import { useState } from 'react';

interface DropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const CityFilter: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className='flex flex-row gap-5'>
      <p>CITY:</p>
      <select value={selectedOption}
              onChange={handleSelectChange}
              style={{ background: 'transparent', border: 'none', borderBottom: '1px solid black', outline:'none' }}>
       {selectedOption === "" && <option value="">Select a city</option>}
        {options.map((option, index) => (
        <option key={index} value={option}>
          {option.toUpperCase()}
        </option>
      ))}
    </select>
    </div>
    
  );
};

export default CityFilter;
