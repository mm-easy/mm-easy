'use client';

import Link from 'next/link';
import { NewLifecycle, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { useAtom } from 'jotai';
import { AuthChangeEvent } from '@supabase/supabase-js';
// import { GiHamburgerMenu } from 'react-icons/gi';
import { isLoggedInAtom, isMenuOpenAtom } from '../../store/store';
import { supabase } from '@/utils/supabase/supabase';
import { User } from '@/types/users';
// import MenuPage from '@/app/menu/page';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { logout, getCurrentUserProfile } = useAuth();

  /** 현재 로그인되어 있는지 확인 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          return;
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  /** 로그인이 되어 있다면 프로필 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        const userProfile = await getCurrentUserProfile();
        console.log('로그인한 자의 프로필..', userProfile);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  /** 소셜 로그인 처리 */
  useEffect(() => {
    const handleAuthStateChange = (event: AuthChangeEvent) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
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

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    toast.success('로그아웃되었습니다.');
  };

  // const toggleMenuModal = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // const handleLinkClick = () => {
  //   setIsMenuOpen(false);
  // };

  return (
    <>
      <header className="w-full h-[8vh] leading-[7.5vh] flex text-pointColor1 font-bold bg-bgColor1 border-solid border-b-2 border-pointColor1">
        {/* <button onClick={toggleMenuModal}>
          <GiHamburgerMenu className="text-pointColor1" />
        </button> */}
        <Link href="/" className="w-[10%] text-center">
          LOGO
        </Link>
        <section className="w-[90%] flex justify-between px-10">
          <nav className="flex gap-14">
            <Link href="/quiz-list">퀴즈</Link>
            <Link href="/typing-game">타자 연습</Link>
            <Link href="/community-list?category=전체">커뮤니티</Link>
            <Link href="/about">서비스 소개</Link>
          </nav>
          {isLoggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <Link href="/login">
              <button>로그인</button>
            </Link>
          )}
        </section>
      </header>
      {/* {isMenuOpen && <MenuPage />} */}
    </>
  );
};

export default Header;
