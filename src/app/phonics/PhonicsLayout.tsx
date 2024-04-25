'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PhonicsLayout = () => {
  const [currentMenu, setCurrentMenu] = useState('consonants');
  const router = useRouter();

  const categoryMenu: Record<string, string> = {
    자음: 'consonants',
    모음: 'vowels'
  };

  const handleSelectCategory = (category: string) => {
    router.push(`/phonics/${categoryMenu[category]}`);
    setCurrentMenu(category);
  };

  return (
    <>
      <nav className="h-full text-pointColor1 bg-bgColor1 font-bold border-solid border-r-2 border-pointColor1">
        <ul>
          {Object.keys(categoryMenu).map((category) => (
            <li
              key={category}
              className={`h-[8vh] flex items-center pl-12 border-b-2 border-solid border-pointColor1 cursor-pointer bg-bgColor1`}
              onClick={() => handleSelectCategory(category)}
            >
              <button className="text-lg w-full text-left flex">{category}</button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default PhonicsLayout;
