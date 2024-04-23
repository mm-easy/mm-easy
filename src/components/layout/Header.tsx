'use client';

import Link from 'next/link';
import MainLogo from '@/assets/logo_horizontal_1.png';
import MainLogoWhite from '@/assets/logo_horizontal_4.png';
import Image from 'next/image';
import ProfileDropdown from './ProfileDropdown';
import useMultilingual from '@/utils/useMultilingual';
import ToggleLanguage from './ToggleLanguage';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { isLoggedInAtom } from '../../store/store';
import { supabase } from '@/utils/supabase/supabase';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>();
  const m = useMultilingual('header');

  /** 현재 로그인되어 있는지 확인 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          return;
        } else {
          setIsLoggedIn(true);
          setCurrentUserEmail(getSession.data.session.user.email);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  /** 소셜 로그인 처리 */
  useEffect(() => {
    const handleAuthStateChange = (event: AuthChangeEvent) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setCurrentUserEmail('');
      }
    };

    const subscription = supabase.auth.onAuthStateChange(handleAuthStateChange);

    const checkAndUpdateAuthState = async () => {
      if (!isLoggedIn) {
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) {
      } else {
        if (data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    };

    checkAndUpdateAuthState();

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [setIsLoggedIn]);

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <header className="w-full h-[8vh] leading-[7.5vh] flex text-pointColor1 font-bold bg-pointColor1 border-solid border-b-2 border-pointColor1 md:bg-bgColor1 lg:bg-bgColor1">
      <Link href="/" className="w-[35%] md:w-[16%] md:px-[2vw] px-[1vw] text-center flex justify-center items-center">
        <Image src={MainLogo} alt="로고" width={150} className="hidden md:block lg:block" />
        <Image src={MainLogoWhite} alt="로고" width={150} className="ml-7 md:hidden lg:hidden" />
      </Link>
      <section className="w-[65%] md:w-[84%] flex justify-end px-[3vw]">
        <nav className="md:flex md:gap-14 lg:flex lg:gap-14 hidden">
          <Link
            href="/quiz/list"
            className={`hover:border-b-5 hover:border-solid hover:border-pointColor1 ${
              isActive('/quiz') ? 'border-b-5 border-solid border-pointColor1' : ''
            }`}
          >
            {m('HEADER_MENU1')}
          </Link>
          <Link
            href="/typing-game"
            className={`hover:border-b-5 hover:border-solid hover:border-pointColor1 ${
              isActive('/typing-game') ? 'border-b-5 border-solid border-pointColor1' : ''
            }`}
          >
            {m('HEADER_MENU2')}
          </Link>
          <Link
            href="/community/list/전체"
            className={`hover:border-b-5 hover:border-solid hover:border-pointColor1 ${
              isActive('/community') && 'border-b-5 border-solid border-pointColor1'
            }`}
          >
            {m('HEADER_MENU3')}
          </Link>
          <Link
            href="/about"
            className={`hover:border-b-5 hover:border-solid hover:border-pointColor1 ${
              isActive('/about') && 'border-b-5 border-solid border-pointColor1'
            }`}
          >
            {m('HEADER_MENU4')}
          </Link>
          {currentUserEmail === 'daejang@mmeasy.com' && (
            <Link
              href="/admin"
              className={`text-pointColor2 hover:border-b-5 hover:border-solid hover:border-pointColor2 ${
                isActive('/admin') && 'border-b-5 border-solid border-pointColor2'
              }`}
            >
              {m('HEADER_MENU5')}
            </Link>
          )}
        </nav>
        <div className="flex justify-center items-center gap-3">
          <ToggleLanguage />
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <Link href="/login">
              <button>{m('HEADER_LOGIN')}</button>
            </Link>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
