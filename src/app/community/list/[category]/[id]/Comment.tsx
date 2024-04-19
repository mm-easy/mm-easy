import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteComment, useInsertComment, useUpdateComment } from '../../../mutations';
import { useQuery } from '@tanstack/react-query';
import { getComment } from '@/api/comment';
import { profileStorageUrl } from '@/utils/supabase/storage';

import type { PostCommentProps, PostDetailCommentType } from '@/types/posts';

const Comment: React.FC<PostCommentProps> = ({ postId, profile }) => {
  const [content, setContent] = useState('');
  const [btnChange, setBtnChange] = useState<boolean>(false);
  const [contentChange, setContentChange] = useState<string>('');
  const [nowCommentId, setNowCommentId] = useState<string>('');

  const insertCommentMutation = useInsertComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  const { data: postCommentList } = useQuery<PostDetailCommentType[]>({
    queryKey: ['comments'],
    queryFn: async () => {
      try {
        const data = await getComment(postId);
        return data;
      } catch (error) {
        return [];
      }
    }
  });

  /**댓글 작성 */
  const handleSubmitBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      toast.warning('로그인후 작성해주세요');
      setContent('');
      return;
    }
    insertCommentMutation.mutate({ profile, postId, content });
    setContent('');
  };

  /**해당 댓글 수정하기 */
  const handleUpdateBtn = async (id: string) => {
    const nowReal = window.confirm('댓글을 수정하시겠습니까?');
    if (nowReal) {
      updateCommentMutation.mutate({ contentChange, id });
      setBtnChange(!btnChange);
    } else {
      return;
    }
  };

  /**해당 댓글 삭제하기*/
  const handleDeleteBtn = async (id: string) => {
    const nowReal = window.confirm('댓글을 삭제하시겠습니까?');
    if (nowReal) {
      deleteCommentMutation.mutate(id);
    } else {
      return;
    }
  };

  return (
    <div>
      <div>
        {postCommentList?.map((prev) => {
          return (
            <div className="pt-8 flex border-solid border-b border-grayColor2" key={prev.id}>
              <div className="w-[50px] h-[50px] m-5 ml-0 flex justify-center rounded-full overflow-hidden">
                <Image
                  src={`${profileStorageUrl}/${prev.profiles?.avatar_img_url || '프로필이미지'}`}
                  alt="프로필이미지"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center text-blackColor">
                <p className="pb-2 font-semibold">{prev.profiles?.nickname}</p>

                {btnChange && nowCommentId === prev.id ? (
                  <div>
                    <textarea
                      className="resize-none focus:outline-none border-solid border border-grayColor2"
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
          <div className="border-solid border border-grayColor2">
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
