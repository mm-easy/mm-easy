'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { useAtom } from 'jotai';
import { AuthChangeEvent } from '@supabase/supabase-js';
// import { GiHamburgerMenu } from 'react-icons/gi';
import { isLoggedInAtom, isMenuOpenAtom } from '../../store/store';
import { supabase } from '@/utils/supabase/supabase';
// import MenuPage from '@/app/menu/page';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { logout } = useAuth();

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
            <Link href="/community-list">커뮤니티</Link>
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