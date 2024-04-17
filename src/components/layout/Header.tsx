'use client';

import Link from 'next/link';
import MainLogo from '@/assets/logo_horizontal_1.png';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { isLoggedInAtom } from '../../store/store';
import { supabase } from '@/utils/supabase/supabase';
import ProfileDropdown from './ProfileDropdown';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>();
  const pathname = usePathname();
   


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

  return (
    <header className="w-full h-[8vh] leading-[7.5vh] flex text-pointColor1 font-bold bg-bgColor1 border-solid border-b-2 border-pointColor1">
      <Link href="/" className="w-[16%] text-center flex justify-center items-center">
        <Image src={MainLogo} alt="로고" width={150} />
      </Link>
      <section className="w-[84%] flex justify-between px-10">
        <nav className="flex gap-14">
        {['/quiz-list', '/typing-game', '/community-list', '/about'].map((path, index) => (
            <Link key={index} href={path} className={`hover:border-b-5 hover:border-solid hover:border-pointColor1 ${pathname === path ? 'border-b-5 border-solid border-pointColor1' : ''}`}>
                {['퀴즈', '타자 연습', '커뮤니티', '서비스 소개'][index]}
            </Link>
          ))}
        </nav>
        {isLoggedIn ? (
          <ProfileDropdown />
        ) : (
          <Link href="/login">
            <button>로그인</button>
          </Link>
        )}
      </section>
    </header>
  );
};

export default Header;
