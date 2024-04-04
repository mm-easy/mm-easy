'use client';

import Image from 'next/image';
import SubHeader from '@/components/common/SubHeader';
import CommentForm from '../../(components)/CommentForm';
import CommentList from '../../(components)/CommentList';
import CommunityMenu from '../../(components)/CommunityMenu';
import CommunityForm from '../../(components)/CommunityForm';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';
import { supabase } from '@/utils/supabase/supabase';
import { formatToLocaleDateTimeString } from '@/utils/date';

import type { PostDetailDateType } from '@/types/posts';

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
    <article>
      <SubHeader text="커뮤니티" />
      <div className="flex bg-bgColor1 justify-center text-pointColor1 pb-12">
        {/* <CommunityMenu /> */}
        <div className="py-10 bg-white px-20 border-2 border-solid border-t-0 border-r-0 border-pointColor1 w-full">
          {post && post.profiles && (
            <div>
              <div className="flex justify-between">
                <p>{post.category}</p>
                <time>{formatToLocaleDateTimeString(post.created_at)}</time>
              </div>
              <div className="flex border-solid border-b-2 border-t-2">
                <div className="m-5 w-70 h-70 rounded-full overflow-hidden border-2 border-solid border-pointColor1">
                  <Image
                    src={post.profiles.avatar_img_url}
                    alt="프로필이미지"
                    width={70}
                    height={70}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center text-blackColor">
                  <p>{post.profiles.nickname}</p>
                  <p className="text-2xl font-bolder">{post.title}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-solid border-b-2">
                <div className="flex items-center">
                  <FaHeart />
                  <span className="ml-2">좋아요</span>
                </div>
                <div>
                  <button className="border-2 border-solid border-pointColor1 py-3 px-4 border-r-0 border-t-0 border-b-0">
                    수정
                  </button>
                  <button className="border-2 border-solid border-pointColor1 py-3 px-4 border-l-2 border-t-0 border-r-0 border-b-0">
                    삭제
                  </button>
                </div>
              </div>
              <p className="m-5 text-blackColor">{post.content}</p>
              <div className="border-solid border-t-2">
                <span>댓글</span>
                <CommentList postId={params.id} />
              </div>
              <CommentForm postId={params.id} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default page;
