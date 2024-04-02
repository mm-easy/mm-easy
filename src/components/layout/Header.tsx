'use client';

import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';

const Header = () => {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    toast.success('로그아웃되었습니다.');
  };

  return (
    <section className="bg-yellow-50 border-solid border-b border-blue-500 p-5 pl-10 pr-10 min-h-20 flex items-end justify-between">
      <button onClick={handleLogout}>MENU</button>
      <p>로고ㅎ</p>
      <button onClick={handleLogout} className="ml-10">
        로그아웃
      </button>
    </section>
  );
};
export default Header;
