'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useMultilingual from '@/utils/useMultilingual';

const PhonicsLayout = () => {
  const m = useMultilingual('phonics');
  const pathname = usePathname();

  /** 현재 선택한 메뉴인지 확인 */
  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <>
      <nav className="h-[84vh] sm:h-[7vh] text-pointColor1 font-bold">
        <div className="sm:h-[7vh] sm:flex sm:px-6 sm:bg-white sm:border-b-1 sm:border-solid sm:border-pointColor1">
          <Link
            href="/phonics/consonants"
            className={`sm:h-[7vh] sm:pl-0 sm:justify-center sm:w-[50%] sm:bg-white sm:text-pointColor1 sm:text-base h-[8vh] sm:border-0 flex items-center text-lg pl-8 border-b-2 border-solid border-pointColor1 cursor-pointer bg-bgColor1 ${
              isActive('/phonics/consonants') ? 'sm:border-b-[6px] bg-pointColor1 text-white' : 'bg-white sm:border-b-1 sm:border-solid sm:border-pointColor1'
            }`}
          >
            {m('CONSONANT_CATEGORY')}
          </Link>
          <Link
            href="/phonics/vowels"
            className={`sm:h-[7vh] sm:pl-0 sm:justify-center sm:w-[50%] sm:bg-white sm:text-pointColor1 sm:text-base h-[8vh] sm:border-0 flex items-center text-lg pl-8 border-b-2 border-solid border-pointColor1 cursor-pointer bg-bgColor1 ${
              isActive('/phonics/vowels') ? 'sm:border-b-[6px] bg-pointColor1 text-white' : 'bg-white sm:border-b-1 sm:border-solid sm:border-pointColor1'
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
