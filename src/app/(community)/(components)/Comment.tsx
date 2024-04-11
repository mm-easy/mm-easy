import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { supabase } from '@/utils/supabase/supabase';

import type { PostCommentProps, PostDetailCommentType } from '@/types/posts';
import { profileStorageUrl } from '@/utils/supabase/storage';

const Comment: React.FC<PostCommentProps> = ({ postId, profile }) => {
  const [content, setContent] = useState('');
  const [postCommentList, setPostCommentList] = useState<PostDetailCommentType[]>([]);
  const [btnChange, setBtnChange] = useState<boolean>(false);
  const [contentChange, setContentChange] = useState('');
  const [nowCommentId, setNowCommentId] = useState<string>('');

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
          .eq('post_id', postId)
          .order('created_at', { ascending: false });
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
            <div className="pt-8 flex border-solid border-b border-pointColor3" key={prev.id}>
              <div className="w-50 h-50 m-5 ml-0 flex justify-center rounded-full overflow-hidden">
                <Image
                  src={`${profileStorageUrl}/${prev.profiles?.avatar_img_url || '프로필이미지'}`}
                  alt="프로필이미지"
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center text-blackColor">
                <p>{prev.profiles?.nickname}</p>
                {/* <time>{formatToLocaleDateTimeString(prev.created_at)}</time> */}

                {btnChange && nowCommentId === prev.id ? (
                  <div>
                    <textarea
                      className="resize-none focus:outline-none border-solid border border-pointColor3 "
                      value={contentChange}
                      onChange={(e) => setContentChange(e.target.value)}
                      placeholder="Reply to comment…"
                    />
                  </div>
                ) : (
                  <p>{prev.content}</p>
                )}
              </div>
              <div className="ml-auto">
                {profile &&
                  (profile.id === prev.author_id ? (
                    btnChange ? (
                      <>
                        <button className="pr-2" onClick={() => handleUpdateBtn(prev.id)}>
                          수정완료
                        </button>
                        |
                        <button
                          className="pl-2"
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
                          className="pr-2"
                          onClick={() => {
                            setBtnChange(!btnChange);
                            setContentChange(prev.content);
                            setNowCommentId(prev.id);
                          }}
                        >
                          수정
                        </button>
                        |
                        <button className="pl-2" onClick={() => handleDeleteBtn(prev.id)}>
                          삭제
                        </button>
                      </>
                    )
                  ) : (
                    <></>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <form onSubmit={handleSubmitBtn}>
          <div className="border-solid border border-pointColor3">
            <div className="p-4">
              <span className="text-blackColor font-bold">{profile?.nickname}</span>
              <div>
                <textarea
                  className="resize-none pt-3 w-full focus:outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="댓글을 남겨보세요"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="w-20 h-12 mt-4 p-2 font-bold rounded-md text-white border-solid border border-white bg-pointColor1"
              type="submit"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
