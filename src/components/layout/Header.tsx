'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';
import MenuPage from '@/app/menu/page';
import { useAtom } from 'jotai';
import { isMenuOpenAtom } from '../../store/store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
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
      <section className="h-16 fixed w-full bg-bgColor1 border-solid border-b border-pointColor1 p-5 pl-10 pr-10 flex items-center justify-between z-50">
        <button onClick={toggleMenuModal}>
          <GiHamburgerMenu className="text-pointColor1" />
        </button>
        <Link href="/" className="text-pointColor1 font-bold">
          로고ㅎ
        </Link>
        <button onClick={handleLogout} className="ml-10">
          로그아웃
        </button>
      </section>

      {isMenuOpen && <MenuPage />}
    </>
  );
};

export default Header;
