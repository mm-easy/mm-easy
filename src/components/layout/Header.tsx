'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Header = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    toast.success('로그아웃되었습니다.');
  };

  return (
    <section className="bg-bgColor1 border-solid border-b border-pointColor1 p-5 pl-10 pr-10 min-h-20 flex items-end justify-between">
      <button>MENU</button>
      <Link href="/">로고ㅎ</Link>
      <button onClick={handleLogout} className="ml-10">
        로그아웃
      </button>
    </section>
  );
};
export default Header;
