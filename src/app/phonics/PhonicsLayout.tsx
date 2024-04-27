'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const PhonicsLayout = () => {
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
      <nav className="h-full text-pointColor1 bg-bgColor1 font-bold border-solid border-r-2 border-pointColor1">
        <div>
          <Link
            href="/phonics/consonants"
            className={`h-[8vh] flex items-center text-lg pl-8 border-b-2 border-solid border-pointColor1 cursor-pointer bg-bgColor1 ${
              isActive('/phonics/consonants') ? 'bg-pointColor1 text-white' : 'bg-white'
            }`}
          >
            자음
          </Link>
          <Link
            href="/phonics/vowels"
            className={`h-[8vh] flex items-center text-lg pl-8 border-b-2 border-solid border-pointColor1 cursor-pointer bg-bgColor1 ${
              isActive('/phonics/vowels') ? 'bg-pointColor1 text-white' : 'bg-white'
            }`}
          >
            모음
          </Link>
        </div>
      </nav>
    </>
  );
};

export default PhonicsLayout;
