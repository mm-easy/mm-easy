import { useState } from 'react';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

const ToggleSwitch = () => {
  const [lang, setLang] = useAtom(langAtom);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
    setLang((prevLang) => (prevLang === 'en' ? 'ko' : 'en'));
  };

  return (
    <main>
      <div className="relative flex items-center w-16 h-9 rounded-full border-solid border border-white md:border-pointColor1">
        <div
          className={`absolute w-7 z-0 h-7 rounded-full transition-transform duration-300 bg-white md:bg-pointColor1 ${
            isChecked ? 'right-1' : 'left-1'
          }`}
        />
        <p
          className={`absolute left-2 z-1 cursor-pointer ${
            isChecked ? 'text-white md:text-pointColor1' : 'text-pointColor1 md:text-white'
          } text-sm`}
          onClick={handleToggle}
        >
          EN
        </p>
        <p
          className={`absolute right-2 z-1 cursor-pointer ${
            isChecked ? 'text-pointColor1 md:text-white' : 'text-white md:text-pointColor1'
          } text-sm`}
          onClick={handleToggle}
        >
          KR
        </p>
      </div>
    </main>
  );
};

export default ToggleSwitch;
