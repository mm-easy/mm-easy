'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

import { fetchPost, updateCommunityPost } from '@/api/posts';
import PostEditor from '@/app/community-list/PostEditor';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store/store';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabase';

const EditPage = ({ params }: { params: { id: string; category: string } }) => {
  const postId = params.id;
  const router = useRouter();

  const {
    data: post,
    isLoading,
    isError
  } = useQuery({
    queryFn: async () => {
      try {
        const data = await fetchPost(postId);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['posts']
  });

  if (isLoading) return <div>Loading...</div>;

  const navigateToCreatedPost = (postId: string) => {
    router.push(`/community-list/${params.category}/${postId}`);
  };

  return (
    <PostEditor
      defaultValues={{
        category: post.category,
        title: post.title,
        content: post.content
      }}
      onSubmit={async ({ category, title, content }) => {
        await updateCommunityPost(postId, title, content as unknown as string, category);
        toast('수정이 완료되었습니다.');
        navigateToCreatedPost(postId);
        console.log('content => ', content);
      }}
    />
  );
};

export default EditPage;