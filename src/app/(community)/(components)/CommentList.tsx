import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';

import type { PostDetailCommentType } from '@/types/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';

const CommentList = ({ postId }: { postId: string | string[] }) => {
  const [postCommentList, setPostCommentList] = useState<PostDetailCommentType[]>([]);

  useEffect(() => {
    const commentList = async () => {
      try {
        const { data: comments, error } = await supabase
          .from('comments')
          .select(`*, profiles!inner(nickname,avatar_img_url)`)
          .eq('post_id', postId);
        if (error) throw error;
        setPostCommentList(comments);
      } catch (error) {
        throw error;
      }
    };
    commentList();
  }, [postCommentList]);

  return (
    <div>
      {postCommentList?.map((prev) => {
        return (
          <div key={prev.id}>
            <p>{prev.profiles?.nickname}</p>
            <p>{prev.profiles?.avatar_img_url}</p>
            <time>{formatToLocaleDateTimeString(prev.created_at)}</time>
            <p>{prev.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
