'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import CommentForm from '../../(components)/CommentForm';
import CommentList from '../../(components)/CommentList';
import CommunityMenu from '../../(components)/CommunityMenu';
import CommunityForm from '../../(components)/CommunityForm';
import { formatToLocaleDateTimeString } from '@/utils/date';

import type { PostDetailDateType } from '@/types/posts';

const page = () => {
  // const [selectedCategory, setSelectedCategory] = useState<string>('전체');
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
      {/* <div className="flex">
        <CommunityMenu setSelectedCategory={setSelectedCategory} />
        <CommunityForm selectedCategory={selectedCategory} />
      </div> */}
      {post && (
        <div>
          <p>{post.category}</p>
          <p>{post.profiles?.nickname}</p>
          <p>{post.profiles?.avatar_img_url}</p>
          <p>{post.title}</p>
          <p>{post.content}</p>
          <time>{formatToLocaleDateTimeString(post.created_at)}</time>
        </div>
      )}
      <CommentForm postId={params.id} />
      <CommentList postId={params.id} />
    </div>
  );
};

export default page;
