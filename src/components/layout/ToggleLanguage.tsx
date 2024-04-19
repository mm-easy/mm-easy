import ToggleLanguage from './ToggleLanguage';
import { useState } from 'react';
import { LanguageType } from '@/types/langs';

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <main>
      <div className="relative flex items-center w-16 h-9 rounded-full border-solid border border-pointColor1">
        <div
          className={`absolute w-7 h-7 rounded-full bg-pointColor1 cursor-pointer transition-right duration-300 ${
            isChecked ? 'right-1' : 'left-1'
          }`}
          onClick={handleToggle}
        />
        <p className={`absolute left-2 ${isChecked ? 'text-pointColor1' : 'text-white'}text-sm`}>EN</p>
        <p className={`absolute right-2 text-pointColor1 text-sm`}>KR</p>
      </div>
    </main>
  );
};

export default ToggleSwitch;
