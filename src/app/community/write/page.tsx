'use client';

import { useQuery } from '@tanstack/react-query';
import PostEditor from './PostEditor';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { insertPost } from '@/api/posts';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import { isLoggedInAtom } from '@/store/store';
import { useAtom } from 'jotai';

const PostPage = () => {
  const { getCurrentUserProfile } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const router = useRouter();

  const {
    data: userProfile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          router.push('/login');
          toast('로그인 후 이용해 주세요');
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

  const handleCancel = () => {
    const confirmLeave = window.confirm('작성 중인 내용이 사라집니다. 정말 페이지를 나가시겠습니까?');
    if (confirmLeave) {
      router.push('/community/list/전체');
    }
  };

  return (
    <article className="border-l-2 border-solid border-pointColor1 bg-white px-[8vw] py-16">
      <PostEditor
        onCancel={handleCancel}
        onSubmit={async ({ category, title, content }) => {
          if (!userProfile) {
            toast('사용자 정보가 없습니다.');
            return;
          }
          if (!title.trim()) {
            toast('제목을 입력해주세요.');
            return;
          }
          if (!(content as unknown as string).trim()) {
            toast('내용을 입력해주세요.');
            return;
          }
          try {
            const newPost = await insertPost(title, content as unknown as string, category, userProfile.id);
            toast('게시물이 등록되었습니다.');
            router.push(`/community/list/${category}/${newPost}`);
          } catch (error) {
            toast('게시물 추가 중 오류가 발생했습니다.');
            console.error(error);
          }
        }}
      />
    </article>
  );
};

export default PostPage;
