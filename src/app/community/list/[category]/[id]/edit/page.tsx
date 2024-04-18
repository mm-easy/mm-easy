'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

import { fetchPost, updateCommunityPost } from '@/api/posts';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import PostEditor from '@/app/community/write/PostEditor';

const EditPage = ({ params }: { params: { id: string; category: string } }) => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { getCurrentUserProfile } = useAuth();
  const postId = params.id;
  const router = useRouter();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const data = await fetchPost(postId);
      return data;
    },
  });

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          router.push('/login');
          toast('로그인 후 이용하세요.');
          return;
        }
        const userProfile = await getCurrentUserProfile();
        if (!userProfile) return;

        if (post && userProfile.id !== post.author_id && userProfile.email !== 'daejang@mmeasy.com') {
          console.log("author_id",post.author_id)
          console.log("userProfile.id",userProfile.id)
          router.push('/');
          toast('수정 권한이 없습니다.');
          return;
        }
        setIsLoggedIn(true);
      } catch (error) {
        toast('프로필 정보를 찾을 수 없습니다.');
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    if (!isLoading && post) {
      checkAccess();
    }
  }, [post, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  const navigateToCreatedPost = (postId: string) => {
    router.push(`/community/list/${params.category}/${postId}`);
  };

  const handleCancel = () => {
    const confirmLeave = window.confirm("작성 중인 내용이 사라집니다. 정말 페이지를 나가시겠습니까?");
    if (confirmLeave) {
      router.push('/community/list/전체');
    }
  };

  // TODO : 조건부로 랜더링
  return (
    <article className="bg-white px-48 py-16 border-l-2 border-solid border-pointColor1">
      <PostEditor
        defaultValues={{
          category: post.category,
          title: post.title,
          content: post.content
        }}
        onCancel={handleCancel}
        onSubmit={async ({ category, title, content }) => {
          await updateCommunityPost(postId, title, content as unknown as string, category);
          toast('수정이 완료되었습니다.');
          navigateToCreatedPost(postId);
          console.log('content => ', content);
        }}
      />
    </article>
  );
};

export default EditPage;
