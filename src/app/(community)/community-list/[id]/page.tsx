'use client';

import Image from 'next/image';
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
    <div className="flex items-center justify-center">
      <CommunityMenu />
      <div className="bg-white p-3 border border-solid border-pointColor1 max-w-md w-full mx-4">
        {/* <div className="flex">
        <CommunityMenu setSelectedCategory={setSelectedCategory} />
        <CommunityForm selectedCategory={selectedCategory} />
      </div> */}

        {post && post.profiles && (
          <div>
            <div className="flex flex-row">
              <p>{post.category}</p>
              <time>{formatToLocaleDateTimeString(post.created_at)}</time>
            </div>
            <div className="flex">
              <div className="w-100 h-100 rounded-full overflow-hidden border border-solid border-pointColor1">
                <Image
                  src={post.profiles.avatar_img_url}
                  alt="프로필이미지"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <div>
                <p>{post.profiles.nickname}</p>
                <p>{post.title}</p>
              </div>
            </div>

            <p>{post.content}</p>

            <CommentList postId={params.id} />
            <CommentForm postId={params.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
