'use client';

import { useQuery } from '@tanstack/react-query';
import PostEditor from '../PostEditor';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { insertPost } from '@/api/posts';
import { useRouter } from 'next/navigation';

const PostPage = () => {
  const { getCurrentUserProfile } = useAuth();
  const router = useRouter();

  const {
    data: userProfile,
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  return (
    <PostEditor
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
          router.push(`/community-list/${category}/${newPost}`);
        } catch (error) {
          toast('게시물 추가 중 오류가 발생했습니다.');
          console.error(error);
        }
      }}
    />
  );
};

export default PostPage;