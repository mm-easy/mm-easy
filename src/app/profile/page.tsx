'use client';

import MyLevelAndScore from './MyLevelAndScore';
import MyProfile from './MyProfile';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';

import type { User } from '@/types/users';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { getCurrentUserProfile } = useAuth();
  const router = useRouter();

  /** 현재 로그인되어 있는지 확인 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          alert('로그인이 필요한 페이지입니다.');
          router.replace('/login');
        } else {
          const userProfile = await getCurrentUserProfile();
          setCurrentUser((prev) => userProfile);
          console.log('끼이잉', currentUser);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  if (!currentUser) {
    return <div className="flex w-full justify-center my-96">로그인 정보를 불러오고 있습니다.</div>;
  }

  return (
    <main>
      <div className="h-[47vh]">
        <MyProfile currentUser={currentUser} />
      </div>
      <div className="h-[37vh]">
        <MyLevelAndScore currentUser={currentUser} />
      </div>
    </main>
  );
};

export default ProfilePage;

// /** 로그인이 되어 있다면 프로필 가져오기 */
// useEffect(() => {
//   const fetchData = async () => {
//     if (isLoggedIn) {
//       const userProfile = await getCurrentUserProfile();
//       setCurrentUser(userProfile);
//       console.log('끼이잉', currentUser);
//     }
//   };

//   fetchData();
// }, []);
