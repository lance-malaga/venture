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
      <select value={selectedOption} onChange={handleSelectChange}>
      <option value="">Select a city</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    </div>
    
  );
};

export default CityFilter;
