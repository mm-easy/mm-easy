'use client';

import useMultilingual from '@/utils/useMultilingual';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const PhonicsLayout = () => {
  const m = useMultilingual('phonics');
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState('consonants');
  const router = useRouter();

  const categoryMenu: Record<string, string> = {
    자음: 'consonants',
    모음: 'vowels'
  };

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const handleSelectCategory = (category: string) => {
    router.push(`/phonics/${category}`);
    setCurrentMenu(category);
  };

  return (
    <>
      <nav className="h-[84vh] sm:h-full text-pointColor1 font-bold ">
        <div className="sm:flex sm:px-6 sm:bg-white sm:border-b-1 sm:border-solid sm:border-pointColor1">
          <Link
            href="/phonics/consonants"
            className={`sm:pl-0 sm:justify-center sm:w-[50%] sm:bg-white sm:text-pointColor1 sm:text-base h-[8vh] sm:border-0 flex items-center text-lg pl-8 border-b-2 border-solid border-pointColor1 cursor-pointer bg-bgColor1 ${
              isActive('/phonics/consonants') ? 'sm:border-b-[7px] bg-pointColor1 text-white' : 'bg-white'
            }`}
          >
            {m('CONSONANT_CATEGORY')}
          </Link>
          <Link
            href="/phonics/vowels"
            className={`sm:pl-0 sm:justify-center sm:w-[50%] sm:bg-white sm:text-pointColor1 sm:text-base h-[8vh] sm:border-0 flex items-center text-lg pl-8 border-b-2 border-solid border-pointColor1 cursor-pointer bg-bgColor1 ${
              isActive('/phonics/vowels') ? 'sm:border-b-[7px] bg-pointColor1 text-white' : 'bg-white'
            }`}
          >
            {m('VOWEL_CATEGORY')}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default PhonicsLayout;
