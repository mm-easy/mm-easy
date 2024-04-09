'use client';

import EditForm from '@/app/(community)/(components)/EditForm';
import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';


import type { Post } from '@/types/posts';
import { fetchPost } from '@/api/posts';

const EditPage = ({ params }: { params: { id: string } }) => {
  const { getCurrentUserProfile } = useAuth();
  const postId = params.id;
  
    const { data: userProfile, isLoading: isProfileLoading } = useQuery({
      queryKey: ['userProfile'],
      queryFn: getCurrentUserProfile
    });

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
  const { title, content, imageUrl, category, author_id } = post;

  return (
    <div>
      <EditForm
        postId={postId}
        prevTitle={title}
        prevContent={content}
        prevImageUrls={imageUrl}
        prevCategory={category}
        prevAuthorId={author_id}
      />
    </div>
  );
};

export default EditPage;