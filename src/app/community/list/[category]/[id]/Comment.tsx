import Image from 'next/image';
import useMultilingual from '@/utils/useMultilingual';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteComment, useInsertComment, useUpdateComment } from '../../../mutations';
import { useQuery } from '@tanstack/react-query';
import { getComment } from '@/api/comment';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { formatCommentDateToLocal } from '@/utils/date';
import { HiDotsVertical } from 'react-icons/hi';

import type { PostCommentProps, PostDetailCommentType } from '@/types/posts';

const Comment: React.FC<PostCommentProps> = ({ postId, profile }) => {
  const [content, setContent] = useState('');
  const [btnChange, setBtnChange] = useState<boolean>(false);
  const [contentChange, setContentChange] = useState<string>('');
  const [nowCommentId, setNowCommentId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const m = useMultilingual('communityDetail');

  const insertCommentMutation = useInsertComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();

  const { data: postCommentList } = useQuery<PostDetailCommentType[]>({
    queryKey: ['comments', postId],
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
      toast.warning(m('COMMUNITY_COMMENT_CHECK_LOGIN'));
      setContent('');
      return;
    }
    insertCommentMutation.mutate({ profile, postId, content });
    setContent('');
  };

  /**해당 댓글 수정하기 */
  const handleUpdateBtn = async (id: string) => {
    const nowReal = window.confirm(m('COMMUNITY_COMMENT_EDIT_CONFIRM'));
    if (nowReal) {
      updateCommentMutation.mutate({ contentChange, id });
      setBtnChange(!btnChange);
    } else {
      return;
    }
  };

  /**해당 댓글 삭제하기*/
  const handleDeleteBtn = async (id: string) => {
    const nowReal = window.confirm(m('COMMUNITY_COMMENT_DELETE_CONFIRM'));
    if (nowReal) {
      deleteCommentMutation.mutate(id);
    } else {
      return;
    }
  };

  const userMenuOnBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div>
      <div>
        {postCommentList?.map((prev) => {
          return (
            <div className="pt-8 flex border-solid border-b border-grayColor2" key={prev.id}>
              <div className="sm:w-[40px] sm:h-[40px] w-[50px] h-[50px] m-5 ml-0 flex justify-center rounded-full overflow-hidden">
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
                  <div>
                    <p className="w-[80vh]">{prev.content}</p>
                    <div className="text-gray-400 my-2">
                      <p>{formatCommentDateToLocal(prev.created_at)}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between ml-auto">
                <div className="sm:hidden">
                  {profile &&
                    ((prev.id && profile.id === prev.author_id) || profile?.email === 'daejang@mmeasy.com' ? (
                      btnChange && prev.id === nowCommentId ? (
                        <>
                          <div className="flex justify-end">
                            <button className="pr-2 font-bold" onClick={() => handleUpdateBtn(prev.id)}>
                              {m('COMMUNITY_COMMENT_SAVE')}
                            </button>
                            |
                            <button
                              className="pl-2 font-bold"
                              onClick={() => {
                                setBtnChange(!btnChange);
                                setContentChange(prev.content);
                              }}
                            >
                              {m('COMMUNITY_COMMENT_CANCEL')}
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-end">
                            <button
                              className="pr-2 font-bold"
                              onClick={() => {
                                setBtnChange(!btnChange);
                                setContentChange(prev.content);
                                setNowCommentId(prev.id);
                              }}
                            >
                              {m('COMMUNITY_COMMENT_EDIT')}
                            </button>
                            |
                            <button className="pl-2 font-bold" onClick={() => handleDeleteBtn(prev.id)}>
                              {m('COMMUNITY_COMMENT_DELETE')}
                            </button>
                          </div>
                        </>
                      )
                    ) : (
                      <div></div>
                    ))}
                </div>
                <div className="sm:block hidden">
                  {profile && (profile.id === prev.author_id || profile?.email === 'daejang@mmeasy.com') ? (
                    <div className="relative">
                      <button onClick={() => setIsOpen(!isOpen)} onBlur={userMenuOnBlur} className="focus:outline-none">
                        <HiDotsVertical />
                      </button>
                      {isOpen &&
                        nowCommentId === prev.id &&
                        (btnChange && prev.id === nowCommentId ? (
                          <div className="absolute flex flex-col right-0 mt-2 py-2 w-48 border-solid border border-pointColor1 bg-white rounded-md z-20">
                            <button className="pr-2 font-bold" onClick={() => handleUpdateBtn(prev.id)}>
                              {m('COMMUNITY_COMMENT_SAVE')}
                            </button>
                            <hr className="border-t border-0.5 border-pointColor1" />
                            <button
                              className="pl-2 font-bold"
                              onClick={() => {
                                setBtnChange(!btnChange);
                                setContentChange(prev.content);
                                setIsOpen(false);
                              }}
                            >
                              {m('COMMUNITY_COMMENT_CANCEL')}
                            </button>
                          </div>
                        ) : (
                          <div className="absolute flex flex-col right-0 mt-2 py-2 w-48 border-solid border border-pointColor1 bg-white rounded-md z-20">
                            <button
                              className="font-bold"
                              onClick={() => {
                                setBtnChange(!btnChange);
                                setContentChange(prev.content);
                                setNowCommentId(prev.id);
                                setIsOpen(true);
                              }}
                            >
                              {m('COMMUNITY_COMMENT_EDIT')}
                            </button>
                            <hr className="border-t border-0.5 border-pointColor1" />
                            <button className="font-bold" onClick={() => handleDeleteBtn(prev.id)}>
                              {m('COMMUNITY_COMMENT_DELETE')}
                            </button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sm:hidden mt-8">
        <form onSubmit={handleSubmitBtn}>
          <div className="border-solid border border-grayColor2">
            <div className="p-4">
              <span className="text-blackColor font-bold">{profile?.nickname}</span>
              <div>
                <textarea
                  className="resize-none pt-3 w-full focus:outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={m('COMMUNITY_COMMENT_PLACEHOLDER')}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="w-20 h-12 mt-4 p-2 font-bold rounded-md text-white border-solid border border-white bg-pointColor1"
              type="submit"
            >
              {m('COMMUNITY_COMMENT_SUBMIT')}
            </button>
          </div>
        </form>
      </div>

      <div className="my-8 sm:block hidden">
        <form className="flex items-center w-full" onSubmit={handleSubmitBtn}>
          <div className="flex-grow border-b-1 border-t-1 border-r-1 border-grayColor2 border-solid">
            <div className="pl-4 flex">
              {profile ? (
                <div className="sm:w-[40px] sm:h-[40px] w-[50px] h-[50px] m-5 ml-0 flex justify-center rounded-full overflow-hidden">
                  <Image
                    src={`${profileStorageUrl}/${profile?.avatar_img_url || '프로필이미지'}`}
                    alt="프로필이미지"
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <textarea
                  className={`resize-none w-full focus:outline-none text-center ${profile ? 'pt-3' : 'pt-0'} mt-5`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={m('COMMUNITY_COMMENT_PLACEHOLDER')}
                />
              </div>
            </div>
          </div>
          <button
            className="w-20 h-20 font-bold text-white bg-pointColor1 rounded-md border border-white"
            type="submit"
          >
            {m('COMMUNITY_COMMENT_SUBMIT')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
