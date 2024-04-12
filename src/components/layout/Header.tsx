'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { useAtom } from 'jotai';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from '@nextui-org/react';
import { isLoggedInAtom, isMenuOpenAtom } from '../../store/store';
import { supabase } from '@/utils/supabase/supabase';
import { User } from '@/types/users';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/users';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { logout, getCurrentUserProfile } = useAuth();

  /** 현재 로그인되어 있는지 확인 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          return;
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  /** 소셜 로그인 처리 */
  useEffect(() => {
    const handleAuthStateChange = (event: AuthChangeEvent) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
      }
    };

    const subscription = supabase.auth.onAuthStateChange(handleAuthStateChange);

    const checkAndUpdateAuthState = async () => {
      if (!isLoggedIn) {
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error) {
      } else {
        if (data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }
    };

    checkAndUpdateAuthState();

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, [setIsLoggedIn]);

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

  if (isLoading) return <div>로그인 정보를 불러오고 있습니다.</div>;
  if (isError) return <div>데이터 로드 실패</div>;
  if (!data) return <div>데이터 확인 불가</div>;

  /** 로그아웃 핸들러 */
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    toast.success('로그아웃되었습니다.');
  };

  return (
    <>
      <header className="w-full h-[8vh] leading-[7.5vh] flex text-pointColor1 font-bold bg-bgColor1 border-solid border-b-2 border-pointColor1">
        <Link href="/" className="w-[16%] text-center">
          LOGO
        </Link>
        <section className="w-[84%] flex justify-between px-10">
          <nav className="flex gap-14">
            <Link href="/quiz-list" className="">
              퀴즈
            </Link>
            <Link href="/typing-game">타자 연습</Link>
            <Link href="/community-list?category=전체">커뮤니티</Link>
            <Link href="/about">서비스 소개</Link>
          </nav>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    name={currentUser?.nickname}
                    size="md"
                    src={`${profileStorageUrl}/${currentUser?.avatar_img_url}`}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{currentUser?.email}</p>
                  </DropdownItem>
                  <DropdownItem as={Link} href="/profile">
                    내 프로필
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <Link href="/login">
              <button>로그인</button>
            </Link>
          )}
        </section>
      </header>
    </>
  );
};

export default Header;
