'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { getUser } from '@/api/users';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { extendVariants, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from '@nextui-org/react';
import { supabase } from '@/utils/supabase/supabase';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';
import { useAuth } from '@/hooks/useAuth';
import { profileStorageUrl } from '@/utils/supabase/storage';
import useMultilingual from '@/utils/useMultilingual';

import type { User } from '@/types/users';

const ProfileDropdown = () => {
  const m = useMultilingual('header');
  const route = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { logout } = useAuth();

  const MyAvatar = extendVariants(Avatar, {
    variants: {
      color: {
        white: {
          base: ['bg-white']
        }
      }
    },
    defaultVariants: {
      color: 'white'
    }
  });

  /** 로그아웃 핸들러 */
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    deleteCookie('PostCookie', { path: '/' });
    route.push('/');
    toast.success(m('NOTIFY_TO_LOGOUT'));
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

  if (isLoading) return <div>profile</div>;
  if (isError) return <div>error..</div>;

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <MyAvatar
            as="button"
            className="transition-transform"
            color="white"
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
