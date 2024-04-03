'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    toast.success('로그아웃되었습니다.');
  };

  return (
    <section className="h-16 fixed w-full bg-bgColor1 border-solid border-b border-pointColor1 p-5 pl-10 pr-10 flex items-end justify-between">
      <button>
        <GiHamburgerMenu className="text-pointColor1" />
      </button>
      <Link href="/">로고ㅎ</Link>
      <button onClick={handleLogout} className="ml-10">
        로그아웃
      </button>
    </section>
  );
};
export default Header;
