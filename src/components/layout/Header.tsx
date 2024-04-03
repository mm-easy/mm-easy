'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import MenuPage from '@/app/menu/page';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    toast.success('로그아웃되었습니다.');
  };

  const toggleMenuModal = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <section className="bg-yellow-50 border-solid border-b border-pointColor1 p-5 pl-10 pr-10 min-h-20 flex items-end justify-between">
        <button onClick={toggleMenuModal}>MENU</button>
        <p>로고ㅎ</p>
        <button onClick={handleLogout} className="ml-10">
          로그아웃
        </button>
      </section>

    {isMenuOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center">
        <MenuPage />
      </div>
    )}
    </>
  );
};
export default Header;
