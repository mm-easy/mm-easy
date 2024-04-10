'use client';

import { useAuth } from '@/hooks/useAuth';
import MyLevelAndScore from './MyLevelAndScore';
import MyProfile from './MyProfile';
import { useEffect, useState } from 'react';
import { User } from '@/types/users';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const { getCurrentUserProfile } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userProfile = await getCurrentUserProfile();
  //       if (!userProfile) {
  //         alert('로그인이 필요한 페이지입니다.');
  //         router.replace('/');
  //         return;
  //       }
  //       setCurrentUser(userProfile);
  //       console.log('우우우', userProfile);
  //       console.log('이이이', currentUser);
  //     } catch (error) {
  //       console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <main>
      <div className="h-[47vh]">
        <MyProfile />
      </div>
      <div className="h-[37vh]">
        <MyLevelAndScore />
      </div>
    </main>
  );
};

export default ProfilePage;
