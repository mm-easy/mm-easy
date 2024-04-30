'use client';

import useMultilingual from '@/utils/useMultilingual';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { insertPost } from '@/api/posts';
import { useAuth } from '@/hooks/useAuth';
import { isLoggedInAtom } from '@/store/store';
import PostEditor from './PostEditor';

const PostPage = () => {
  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const router = useRouter();
  const m = useMultilingual('communityPost');

  /** 사용자 프로필 가져오기 */
  const {
    data: userProfile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  })

  /** 사용자 인증 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          router.push('/login');
          toast(m('COMMUNITY_POST_CHECK_LOGIN'));
          return;
        }
        const userProfile = await getCurrentUserProfile();
        if (!userProfile) return;
        setIsLoggedIn(true);
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, []);

  /** 게시글 작성 취소 */
  const handleCancel = () => {
    const confirmLeave = window.confirm(m('COMMUNITY_POST_LEAVE_CONFIRM'));
    if (confirmLeave) {
      router.push('/community/list/전체');
    }
  };

  return (
    <article className="sm:w-[100vw] sm:py-0 sm:px-0 sm:border-l-0 border-l-2 border-solid border-pointColor1 bg-white px-[8vw] py-16">
      <PostEditor
        onCancel={handleCancel}
        onSubmit={async ({ category, title, content }) => {
          if (!userProfile) {
            toast(m('COMMUNITY_POST_USER_NOT_FOUND'));
            return;
          }
          if (!title.trim()) {
            toast(m('COMMUNITY_POST_CHECK_TITLE'));
            return;
          }
          if (!(content as unknown as string).trim()) {
            toast(m('COMMUNITY_POST_CHECK_CONTENT'));
            return;
          }
          try {
            /** 게시글 업로드 */
            const newPost = await insertPost(title, content as unknown as string, category, userProfile.id);
            toast(m('COMMUNITY_POST_COMPLETE'));
            router.push(`/community/list/${category}/${newPost}`);
          } catch (error) {
            toast(m('COMMUNITY_POST_ERROR'));
          }
        }}
      />
    </article>
  );
};

export default PostPage;
