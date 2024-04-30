'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import tailwindColors from '../../../tailwind.config';
import useMultilingual from '@/utils/useMultilingual';
import HomeIcon from '@/assets/mobile/mobile_btn_home.svg';
import QuizIcon from '@/assets/mobile/mobile_btn_quiz.svg';
// import TypingIcon from '@/assets/mobile/mobile_btn_typing.svg'; // 타자연습 모바일 아이콘
import PhonicsIcon from '@/assets/mobile/mobile_btn_phonics.svg';
import CommunityIcon from '@/assets/mobile/mobile_btn_community.svg';
import AboutIcon from '@/assets/mobile/mobile_btn_about.svg';

import type { TailwindColors } from '@/types/tailwind';

const MobileMenu = () => {
  const m = useMultilingual('mobile-menu');
  const pathname = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPost] = useState(0);
  const { colors } = tailwindColors.theme?.extend as { colors: TailwindColors };

  /** 스크롤 내려갈 땐 메뉴 hidden */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      setIsMenuVisible(!isScrolledDown);
      setPrevScrollPost(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname.includes(path);
  };

  return (
    <section className="hidden sm:block">
      <nav
        className={`w-full h-[12vh] bottom-0 fixed z-10 bg-bgColor1 transition-opacity duration-300 ${isMenuVisible ? 'opacity-100' : 'opacity-0 hidden'} pr-2 grid grid-cols-5 items-center gap-1 text-xs border-t border-solid border-pointColor1`}
      >
        <Link href="/" className="flex flex-col items-center gap-2 text-center">
          <HomeIcon
            style={{ fill: isActive('/') ? colors?.pointColor1 : colors?.pointColor3, width: '40px', height: '40px' }}
          />
          <span className={`${isActive('/') ? 'text-pointColor1' : 'text-pointColor3'}`}>{m('HOME_MENU')}</span>
        </Link>
        <Link href="/quiz/list" className="flex flex-col items-center gap-2 text-center">
          <QuizIcon
            style={{
              fill: isActive('/quiz') ? colors?.pointColor1 : colors?.pointColor3,
              width: '38px',
              height: '38px'
            }}
          />
          <span className={`${isActive('/quiz') ? 'text-pointColor1' : 'text-pointColor3'}`}>{m('QUIZ_MENU')}</span>
        </Link>
        {/* <Link href="/typing-game" className="flex flex-col items-center gap-2 text-center">
          <TypingIcon
            style={{
              fill: isActive('/typing-game') ? colors?.pointColor1 : colors?.pointColor3,
              width: '38px',
              height: '38px'
            }}
          />
          <span className={`${isActive('/typing-game') ? 'text-pointColor1' : 'text-pointColor3'}`}>
            {m('TYPING_MENU')}
          </span>
        </Link> */}
        <Link href="/phonics" className="flex flex-col items-center gap-2 text-center">
          <PhonicsIcon
            style={{
              fill: isActive('/phonics') ? colors?.pointColor1 : colors?.pointColor3,
              width: '38px',
              height: '38px'
            }}
          />
          <span className={`${isActive('/phonics') ? 'text-pointColor1' : 'text-pointColor3'}`}>
            {m('PHONICS_MENU')}
          </span>
        </Link>
        <Link href="/community/list/전체" className="flex flex-col items-center gap-2 text-center">
          <CommunityIcon
            style={{
              fill: isActive('/community') ? colors?.pointColor1 : colors?.pointColor3,
              width: '38px',
              height: '38px'
            }}
          />
          <span className={`${isActive('/community') ? 'text-pointColor1' : 'text-pointColor3'}`}>
            {m('COMMUNITY_MENU')}
          </span>
        </Link>
        <Link href="/about" className="flex flex-col items-center gap-2 text-center">
          <AboutIcon
            style={{
              fill: isActive('/about') ? colors?.pointColor1 : colors?.pointColor3,
              width: '38px',
              height: '38px'
            }}
          />
          <span className={`${isActive('/about') ? 'text-pointColor1' : 'text-pointColor3'}`}>{m('ABOUT_MENU')}</span>
        </Link>
      </nav>
    </section>
  );
};

export default MobileMenu;
