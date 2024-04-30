'use client';

import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { fetchPost, updateCommunityPost } from '@/api/posts';
import { isLoggedInAtom } from '@/store/store';
import { useAuth } from '@/hooks/useAuth';
import { ADMIN } from '@/constant/adminId';
import useMultilingual from '@/utils/useMultilingual';
import PostEditor from '@/app/community/write/PostEditor';
import LoadingImg from '@/components/common/LoadingImg';

const EditPage = ({ params }: { params: { id: string; category: string } }) => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const { getCurrentUserProfile } = useAuth();
  const m = useMultilingual('communityPost');
  const postId = params.id;
  const router = useRouter();

  /** 수정할 게시글 정보 가져오기 */
  const { data: post, isLoading } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const data = await fetchPost(postId);
      return data;
    }
  });

  /** 사용자 인증 */
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

        /** 사용자가 다를 시 */
        if (post && userProfile.id !== post.author_id && ADMIN.every((admin) => admin.id !== userProfile.email)) {
          router.push('/');
          toast(m('COMMUNITY_EDIT_ACCESS'));
          return;
        }
        setIsLoggedIn(true);
      } catch (error) {
        toast(m('COMMUNITY_POST_PROFILE_NOT_FOUND'));
      }
    };

    if (!isLoading && post) {
      checkAccess();
    }
  }, [post, isLoading]);

  if (isLoading) return <LoadingImg height="84vh" />;

  /** 게시글 작성 후 해당 게시글로 이동 */
  const navigateToCreatedPost = (postId: string) => {
    router.push(`/community/list/${params.category}/${postId}`);
  };

  /** 게시글 작성 취소 */
  const handleCancel = () => {
    const confirmLeave = window.confirm(m('COMMUNITY_POST_LEAVE_CONFIRM'));
    if (confirmLeave) {
      router.push('/community/list/전체');
    }
  };

  return (
    <article className="sm:border-l-0 sm:py-0 sm:px-0 bg-white px-32 py-16 border-l-2 border-solid border-pointColor1">
      <PostEditor
        defaultValues={{
          category: post.category,
          title: post.title,
          content: post.content
        }}
        onCancel={handleCancel}
        /** 게시글 업데이트 */
        onSubmit={async ({ category, title, content }) => {
          await updateCommunityPost(postId, title, content as unknown as string, category);
          toast(m('COMMUNITY_EDIT_COMPLETE'));
          navigateToCreatedPost(postId);
        }}
      />
    </article>
  );
};

export default EditPage;
