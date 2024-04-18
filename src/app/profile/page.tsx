'use client';

import MyLevelAndScore from './MyLevelAndScore';
import MyProfile from './MyProfile';
import LoadingImg from '@/components/common/LoadingImg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/users';

import type { User } from '@/types/users';

const ProfilePage = () => {
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
  const { data, isLoading } = useQuery<User | null>({
    queryKey: ['loggedInUser'],
    queryFn: async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) return null;
        const fetchData = await getUser(getSession.data.session.user.id);
        return fetchData;
      } catch (error) {
        throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
      }
    }
  });

  // if (isLoading) return <div className="flex w-full justify-center my-96">로그인 정보를 불러오고 있습니다.</div>;
  if (isLoading) return <LoadingImg height="84vh" />;
  if (!data) return <div>사용자 정보 불러오기 실패</div>;

  return (
    <main>
      <div className="h-[47vh]">
        <MyProfile data={data} />
      </div>
      <div className="h-[37vh]">
        <MyLevelAndScore data={data} />
      </div>
    </main>
  );
};

export default ProfilePage;
