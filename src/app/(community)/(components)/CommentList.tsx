import { supabase } from '@/utils/supabase/supabase';
import { useEffect, useState } from 'react';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { Box, Button, TextArea } from '@radix-ui/themes';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

import type { PostDetailCommentType } from '@/types/posts';

const CommentList = ({ postId }: { postId: string | string[] }) => {
  const [postCommentList, setPostCommentList] = useState<PostDetailCommentType[]>([]);
  const [btnChange, setBtnChange] = useState<boolean>(false);
  const [contentChange, setContentChange] = useState('');

  const { getCurrentUserProfile } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  const handleUpdateBtn = async (id: string) => {
    const nowReal = window.confirm('댓글을 수정하시겠습니까?');
    if (nowReal) {
      try {
        await supabase.from('comments').update({ content: contentChange }).eq('id', id).select();
        toast.success('수정 되었습니다.');
        setBtnChange(!btnChange);
      } catch {
        toast.error('수정 하는데 문제가 발생했습니다.');
      }
    } else {
      return;
    }
  };

  const handleDeleteBtn = async (id: string) => {
    const nowReal = window.confirm('댓글을 삭제하시겠습니까?');
    if (nowReal) {
      try {
        await supabase.from('comments').delete().eq('id', id);
        toast.success('삭제 되었습니다.');
      } catch {
        toast.error('삭제 하는데 문제가 발생했습니다.');
      }
    } else {
      return;
    }
  };

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

            {btnChange ? (
              <>
                <Box maxWidth="200px">
                  <TextArea
                    value={contentChange}
                    onChange={(e) => setContentChange(e.target.value)}
                    variant="classic"
                    placeholder="Reply to comment…"
                  />
                </Box>
              </>
            ) : (
              <p>{prev.content}</p>
            )}
            {profile &&
              (profile.id === prev.author_id ? (
                btnChange ? (
                  <>
                    <Button type="submit" color="gray" variant="surface" onClick={() => handleUpdateBtn(prev.id)}>
                      수정완료
                    </Button>
                    <Button
                      type="submit"
                      color="gray"
                      variant="surface"
                      onClick={() => {
                        setBtnChange(!btnChange);
                        setContentChange(prev.content);
                      }}
                    >
                      취소
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      color="gray"
                      variant="surface"
                      onClick={() => {
                        setBtnChange(!btnChange);
                        setContentChange(prev.content);
                      }}
                    >
                      수정
                    </Button>

                    <Button type="submit" color="gray" variant="surface" onClick={() => handleDeleteBtn(prev.id)}>
                      삭제
                    </Button>
                  </>
                )
              ) : (
                <></>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
