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
      <div
        className="relative select-none cursor-pointer flex items-center w-16 h-9 rounded-full border-solid border sm:border-white border-pointColor1"
        onClick={handleToggle}
      >
        <div
          className={`absolute w-7 z-0 h-7 rounded-full duration-300 sm:bg-white bg-pointColor1 ${
            isChecked ? 'translate-x-[110%]' : 'translate-x-[3px]'
          }`}
        />
        <p
          className={`absolute left-2 z-10 cursor-pointer ${
            isChecked ? 'sm:text-white text-pointColor1' : 'sm:text-pointColor1 text-white'
          } text-sm`}
        >
          EN
        </p>
        <p
          className={`absolute right-2 z-10 cursor-pointer ${
            isChecked ? 'sm:text-pointColor1 text-white' : 'sm:text-white text-pointColor1'
          } text-sm`}
        >
          KR
        </p>
      </div>
    </main>
  );
};

export default ToggleSwitch;
