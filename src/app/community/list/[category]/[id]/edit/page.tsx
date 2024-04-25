'use client';

import PostEditor from '@/app/community/write/PostEditor';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { fetchPost, updateCommunityPost } from '@/api/posts';
import { isLoggedInAtom } from '@/store/store';
import { supabase } from '@/utils/supabase/supabase';
import { ADMIN_ACC_1 } from '@/constant/admin-ids';

const EditPage = ({ params }: { params: { id: string; category: string } }) => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { getCurrentUserProfile } = useAuth();
  const m = useMultilingual('communityPost');
  const postId = params.id;
  const router = useRouter();

  const {
    data: post,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const data = await fetchPost(postId);
      return data;
    }
  });

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          router.push('/login');
          toast(m('COMMUNITY_POST_CHECK_LOGIN'));
          return;
        }
        const userProfile = await getCurrentUserProfile();
        if (!userProfile) return;

        if (post && userProfile.id !== post.author_id && userProfile.email !== ADMIN_ACC_1) {
          console.log('author_id', post.author_id);
          console.log('userProfile.id', userProfile.id);
          router.push('/');
          toast(m('COMMUNITY_EDIT_ACCESS'));
          return;
        }
        setIsLoggedIn(true);
      } catch (error) {
        toast(m('COMMUNITY_POST_PROFILE_NOT_FOUND'));
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    if (!isLoading && post) {
      checkAccess();
    }
  }, [post, isLoading]);

  if (isLoading) return <LoadingImg height="84vh" />;

  const navigateToCreatedPost = (postId: string) => {
    router.push(`/community/list/${params.category}/${postId}`);
  };

  const handleCancel = () => {
    const confirmLeave = window.confirm(m('COMMUNITY_POST_LEAVE_CONFIRM'));
    if (confirmLeave) {
      router.push('/community/list/전체');
    }
  };

  // TODO : 조건부로 랜더링
  return (
    <article className="bg-white px-32 py-16 border-l-2 border-solid border-pointColor1">
      <PostEditor
        defaultValues={{
          category: post.category,
          title: post.title,
          content: post.content
        }}
        onCancel={handleCancel}
        onSubmit={async ({ category, title, content }) => {
          await updateCommunityPost(postId, title, content as unknown as string, category);
          toast(m('COMMUNITY_EDIT_COMPLETE'));
          navigateToCreatedPost(postId);
          console.log('content => ', content);
        }}
      />
    </article>
  );
};

export default EditPage;
