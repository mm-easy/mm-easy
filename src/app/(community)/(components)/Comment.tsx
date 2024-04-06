import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { Box, TextArea } from '@radix-ui/themes';
import { useAuth } from '@/hooks/useAuth';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { supabase } from '@/utils/supabase/supabase';

import type { PostDetailCommentType } from '@/types/posts';

const Comment = ({ postId }: { postId: string | string[] | undefined }) => {
  const [content, setContent] = useState('');
  const [postCommentList, setPostCommentList] = useState<PostDetailCommentType[]>([]);
  const [btnChange, setBtnChange] = useState<boolean>(false);
  const [contentChange, setContentChange] = useState('');

  const { getCurrentUserProfile } = useAuth();

  /**현재 유저 정보 가져오기 */
  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

  /**댓글 작성 */
  const handleSubmitBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      toast.warning('로그인후 작성해주세요');
      setContent('');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([{ author_id: profile.id, post_id: postId, content }])
      .select();

    if (error) {
      toast.error('게시물 추가 중 오류가 발생했습니다.');
    } else {
      toast.success('댓글이 등록되었습니다.');
      setContent('');
    }
  };

  /**해당 댓글 수정하기 */
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

  /**해당 댓글 삭제하기*/
  const handleDeleteBtn = async (id: string) => {
    const nowReal = window.confirm('댓글을 삭제하시겠습니까?');
    if (nowReal) {
      try {
        await supabase.from('comments').delete().eq('id', id);
        setPostCommentList((commentNow) => {
          return commentNow?.filter((element) => element.id !== id);
        });
        toast.success('삭제 되었습니다.');
      } catch {
        toast.error('삭제 하는데 문제가 발생했습니다.');
      }
    } else {
      return;
    }
  };

  /**게시글에 맞는 댓글 가져오기*/
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
  }, [content, btnChange]);

  return (
    <div>
      <div>
        {postCommentList?.map((prev) => {
          return (
            <div className="border-solid border-b-2" key={prev.id}>
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
                      <button type="submit" onClick={() => handleUpdateBtn(prev.id)}>
                        수정완료
                      </button>
                      <button
                        type="submit"
                        onClick={() => {
                          setBtnChange(!btnChange);
                          setContentChange(prev.content);
                        }}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        onClick={() => {
                          setBtnChange(!btnChange);
                          setContentChange(prev.content);
                        }}
                      >
                        수정
                      </button>

                      <button type="submit" onClick={() => handleDeleteBtn(prev.id)}>
                        삭제
                      </button>
                    </>
                  )
                ) : (
                  <></>
                ))}
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmitBtn}>
          {profile?.avatar_img_url}
          {profile?.nickname}
          <Box maxWidth="w-full">
            <TextArea
              className="border-solid border-2 border-pointColor1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              variant="classic"
              placeholder="Reply to comment…"
            />
          </Box>
          <button type="submit">등록</button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
