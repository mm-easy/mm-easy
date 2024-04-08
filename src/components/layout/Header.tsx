'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';
import MenuPage from '@/app/menu/page';
import { useAtom } from 'jotai';
import { isMenuOpenAtom } from '../../store/store';
import { isLoggedInAtom } from '../../store/store';
import { supabase } from '@/utils/supabase/supabase';
import { AuthChangeEvent } from '@supabase/supabase-js';

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

  const toggleMenuModal = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <section className="w-full h-[8vh] px-10 flex justify-between items-center bg-bgColor1 border-solid border-b-2 border-pointColor1">
        <button onClick={toggleMenuModal}>
          <GiHamburgerMenu className="text-pointColor1" />
        </button>
        <Link href="/" onClick={handleLinkClick} className="text-pointColor1 font-bold">
          로고ㅎ
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="ml-10 text-pointColor1 font-bold">
            로그아웃
          </button>
        ) : (
          <Link href="/login" onClick={handleLinkClick}>
            <button className="ml-10 text-pointColor1 font-bold">로그인</button>
          </Link>
        )}
      </section>
      {isMenuOpen && <MenuPage />}
    </>
  );
};

export default Header;
