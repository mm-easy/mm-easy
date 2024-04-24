'use client';

import { useEffect, useState } from 'react';
import HomeIcon from '@/assets/mobile/mobile_btn_home.svg';
import QuizIcon from '@/assets/mobile/mobile_btn_quiz.svg';
import TypingIcon from '@/assets/mobile/mobile_btn_typing.svg';
import PhonicsIcon from '@/assets/mobile/mobile_btn_phonics.svg';
import CommunityIcon from '@/assets/mobile/mobile_btn_community.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useMultilingual from '@/utils/useMultilingual';

const MobileMenu = () => {
  const pathname = usePathname();
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPost] = useState(0);
  const m = useMultilingual('mobile-menu');

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
        className={`w-full h-[12vh] bottom-0 fixed z-10 bg-bgColor1 transition-opacity duration-300 ${isMenuVisible ? 'opacity-100' : 'opacity-0 hidden'} pr-2 grid grid-cols-5 items-center gap-2 border-t border-solid border-pointColor1`}
      >
        <Link href="/" className="flex flex-col items-center gap-2 text-center">
          <HomeIcon style={{ fill: isActive('/') ? '#2B84ED' : '#8dbdf6', width: '40px', height: '40px' }} />
          <span className={`${isActive('/') ? 'text-pointColor1' : 'text-pointColor3'}`}>{m('HOME_MENU')}</span>
        </Link>
        <Link href="/quiz/list" className="flex flex-col items-center gap-2 text-center">
          <QuizIcon style={{ fill: isActive('/quiz') ? '#2B84ED' : '#8dbdf6', width: '40px', height: '40px' }} />
          <span className={`${isActive('/quiz') ? 'text-pointColor1' : 'text-pointColor3'}`}>{m('QUIZ_MENU')}</span>
        </Link>
        <Link href="/typing-game" className="flex flex-col items-center gap-2 text-center">
          <TypingIcon
            style={{ fill: isActive('/typing-game') ? '#2B84ED' : '#8dbdf6', width: '40px', height: '40px' }}
          />
          <span className={`${isActive('/typing-game') ? 'text-pointColor1' : 'text-pointColor3'}`}>
            {m('TYPING_MENU')}
          </span>
        </Link>
        <Link href="/phonics" className="flex flex-col items-center gap-2 text-center">
          <PhonicsIcon style={{ fill: isActive('/phonics') ? '#2B84ED' : '#8dbdf6', width: '40px', height: '40px' }} />
          <span className={`${isActive('/phonics') ? 'text-pointColor1' : 'text-pointColor3'}`}>
            {m('PHONICS_MENU')}
          </span>
        </Link>
        <Link href="/community/list/전체" className="flex flex-col items-center gap-2 text-center">
          <CommunityIcon
            style={{ fill: isActive('/community') ? '#2B84ED' : '#8dbdf6', width: '39px', height: '39px' }}
          />
          <span className={`${isActive('/community') ? 'text-pointColor1' : 'text-pointColor3'}`}>
            {m('COMMUNITY_MENU')}
          </span>
        </Link>
      </nav>
    </section>
  );
};

export default MobileMenu;
