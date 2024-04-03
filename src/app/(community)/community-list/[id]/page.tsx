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
import { FaHeart } from 'react-icons/fa';
import { Button } from '@radix-ui/themes';

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
    <div className="flex items-center justify-center text-pointColor1">
      {/* <CommunityMenu /> */}
      <div className="bg-white py-5 px-10 border border-solid border-pointColor1 max-w-md w-full mx-4">
        {post && post.profiles && (
          <div>
            <div className="flex justify-between">
              <p>{post.category}</p>
              <time>{formatToLocaleDateTimeString(post.created_at)}</time>
            </div>
            <div className="flex border-solid border-b border-t">
              <div className="m-5 w-70 h-70 rounded-full overflow-hidden border border-solid border-pointColor1">
                <Image
                  src={post.profiles.avatar_img_url}
                  alt="프로필이미지"
                  width={70}
                  height={70}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-blackColor">
                <p>{post.profiles.nickname}</p>
                <p>{post.title}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-solid border-b">
              <div className="flex items-center">
                <FaHeart />
                <span className="ml-2">좋아요</span>
              </div>
              <div>
                <button className="border border-soild border-pointColor1 py-3 px-4">수정</button>
                <button className="border border-soild border-pointColor1 py-3 px-4">삭제</button>
              </div>
            </div>
            <p className="m-5 text-blackColor">{post.content}</p>
            <div className="border-solid border-t">
              <span>댓글</span>
              <CommentList postId={params.id} />
            </div>
            <CommentForm postId={params.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
