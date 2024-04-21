'use client';

import Link from 'next/link';
import Face2 from '@/assets/face_2.png';
import { getUser } from '@/api/users';
import { supabase } from '@/utils/supabase/supabase';
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { useAuth } from '@/hooks/useAuth';
import { isLoggedInAtom } from '@/store/store';

import type { User } from '@/types/users';
import { useRouter } from 'next/navigation';
import useMultilingual from '@/utils/useMultilingual';

const ProfileDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const m = useMultilingual('header');

  const { logout } = useAuth();
  const route = useRouter();

  /** 로그아웃 핸들러 */
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    route.push('/');
    toast.success('로그아웃되었습니다.');
  };

  /** 로그인한 사용자의 정보를 profiles 테이블에서 불러옴 */
  const { data, isLoading, isError } = useQuery<User | null>({
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
    },
    refetchOnWindowFocus: false
  });

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>정보 로드 에러</div>;

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            color="default"
            size="md"
            src={`${profileStorageUrl}/${data?.avatar_img_url}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">
              {m('HEADER_DROPDOWN_INTRO')}
              <br />
              <span className="font-semibold text-pointColor1">{data?.nickname}</span>
              {m('HEADER_DROPDOWN_NIM')}
            </p>
          </DropdownItem>
          <DropdownItem as={Link} href="/profile">
            {m('HEADER_DROPDOWN_MENU1')}
          </DropdownItem>
          <DropdownItem as={Link} href="/my-activity">
            {m('HEADER_DROPDOWN_MENU2')}
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            {m('HEADER_DROPDOWN_LOGOUT')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
