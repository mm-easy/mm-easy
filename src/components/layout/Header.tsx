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
    <div>
      Header
      <button onClick={handleLogout} className="ml-10">
        로그아웃
      </button>
    </div>
  );
};

export default Header;
