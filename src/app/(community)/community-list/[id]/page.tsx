'use client';

import { usePostDetailCommentDate, usePostDetailDate, usePostDetailUserDate } from '@/hooks/post/usePost';
import { useParams } from 'next/navigation';
import CommentForm from '../../(components)/CommentForm';
import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';
import { PostDetailCommentType } from '@/types/posts';

const page = () => {
  const params = useParams();
  const [postCommentList, setPostCommentList] = useState<PostDetailCommentType[]>([]);

  const { data, isLoading } = usePostDetailDate(params.id);

  const { data: user } = usePostDetailUserDate(data?.author_id);

  useEffect(() => {
    const commentList = async () => {
      try {
        const { data: comments, error } = await supabase.from('comments').select('*').eq('post_id', params.id);
        if (error) throw error;
        setPostCommentList(comments);
      } catch (error) {
        throw error;
      }
    };
    commentList();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  // const commentList = comment || [];
  return (
    <div>
      {data && (
        <div>
          <>
            <p>{user?.nickname}</p>
            <p>{user?.avatar_img_url}</p>
            <p>{data.title}</p>
            <p>{data.content}</p>
            <p>{data.attached_img_url}</p>
          </>
          <CommentForm postId={data.id} />
        </div>
      )}
      {postCommentList?.map((prev) => {
        return <div>{prev.content}</div>;
      })}
      {/* {commentList.map((prev) => {
        return (
          <div>
            <p>{prev.content}</p>
          </div>
        );
      })} */}
    </div>
  );
};

export default page;
