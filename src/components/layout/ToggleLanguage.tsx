import { useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

type LanguageType = 'en' | 'ko';

const ToggleSwitch = () => {
  const [lang, setLang] = useAtom(langAtom);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const cookieLang = getCookie('lang') as LanguageType; // 'lang' 쿠키는 'en' 또는 'ko'일 것으로 가정
    if (cookieLang) {
      setLang(cookieLang);
      setIsChecked(cookieLang === 'ko');
    }
  }, [setLang]);

  const handleToggle = () => {
    const newLang = lang === 'en' ? 'ko' : 'en';
    setIsChecked(lang === 'en');
    setLang(newLang);
    setCookie('lang', newLang, { path: '/', maxAge: 31536000 }); // 쿠키 유효 기간 (1년)
  };

  return (
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
        className={`absolute sm:top-1.5 left-[7px] z-10 cursor-pointer ${
          isChecked ? 'sm:text-white text-pointColor1' : 'sm:text-pointColor1 text-white'
        } text-sm`}
      >
        EN
      </p>
      <p
        className={`absolute sm:top-1.5 right-2 z-10 cursor-pointer ${
          isChecked ? 'sm:text-pointColor1 text-white' : 'sm:text-white text-pointColor1'
        } text-sm`}
      >
        KR
      </p>
    </div>
  );
};

export default ToggleSwitch;
