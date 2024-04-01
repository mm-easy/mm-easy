'use client';

import { postDetailDate } from '@/api/posts';
import { PostDetailDateType } from '@/types/posts';
import { useQuery } from '@tanstack/react-query';

const usePostDetailDate = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => postDetailDate(postId)
  });
};

export default usePostDetailDate;
