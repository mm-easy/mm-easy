'use client';

import MyLevelAndScore from './MyLevelAndScore';
import MyProfile from './MyProfile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/users';

import type { User } from '@/types/users';

const ProfilePage = () => {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const router = useRouter();

  /** 현재 로그인되어 있는지 확인 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          alert('로그인이 필요한 페이지입니다.');
          router.replace('/login');
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  /** 로그인한 사용자의 정보를 profiles 테이블에서 불러옴 */
  const { data, isLoading, isError } = useQuery<User | null>({
    queryFn: async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) return null;
        const fetchData = await getUser(getSession.data.session.user.id);
        setCurrentUser(fetchData);
        return fetchData;
      } catch (error) {
        throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
      }
    },
    queryKey: ['loggedInUser'],
    refetchOnWindowFocus: false
  });
  if (isLoading) return <div className="flex w-full justify-center my-96">로그인 정보를 불러오고 있습니다.</div>;
  if (isError) return <div>데이터 로드 실패</div>;
  if (!data) return;

  if (!currentUser) {
    return;
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
