'use client';

import { PostDetailDateType } from '@/types/posts';
import { supabase } from '@/utils/supabase/supabase';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommentForm from '../../(components)/CommentForm';

const page = () => {
  const [post, setPost] = useState<PostDetailDateType>();
  const params = useParams();

  useEffect(() => {
    const postDetailDate = async () => {
      try {
        const { data: post, error } = await supabase
          .from('posts')
          .select(`*, profiles!inner(nickname,avatar_img_url)`)
          .eq('id', params.id);
        if (error) throw error;
        setPost(post![0]);
      } catch (error) {
        throw error;
      }
    };
    postDetailDate();
  }, []);

  return (
    <div>
      {post && (
        <div>
          <p>{post.profiles?.nickname}</p>
          <p>{post.profiles?.avatar_img_url}</p>
          <p>{post.title}</p>
          <p>{post.content}</p>
          <p>{post.attached_img_url}</p>
          <p>{post.created_at.toLocaleString()}</p>
        </div>
      )}
      <CommentForm postId={post?.id} />
    </div>
  );
};

export default page;
