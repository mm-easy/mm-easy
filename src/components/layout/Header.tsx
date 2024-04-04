"use client"

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
    toast.success('로그아웃되었습니다.');
  };

  const toggleMenuModal = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <section className="h-16 fixed w-full bg-bgColor1 border-solid border-b border-pointColor1 p-5 pl-10 pr-10 flex items-center justify-between z-50">
        <button onClick={toggleMenuModal}>
          <GiHamburgerMenu className="text-pointColor1" />
        </button>
        <Link href="/" className="text-pointColor1 font-bold">
          로고ㅎ
        </Link>
        {isLoggedIn ? ( 
          <button onClick={handleLogout} className="ml-10">
            로그아웃
          </button>
        ) : (
          <Link href="/login"> 
            <button className="ml-10">
              로그인
            </button>
          </Link>
        )}
      </section>

      {isMenuOpen && <MenuPage />}
    </>
  );
};

export default Header;
