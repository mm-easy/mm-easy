import Image from 'next/image';
import useMultilingual from '@/utils/useMultilingual';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCommentIsOpen, useDeleteComment, useInsertComment, useUpdateComment } from '../../../mutations';
import { useQuery } from '@tanstack/react-query';
import { getComment } from '@/api/comment';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { formatCommentDateToLocal } from '@/utils/date';
import { HiDotsVertical } from 'react-icons/hi';

import type { PostCommentProps, PostDetailCommentType } from '@/types/posts';
import { ADMIN } from '@/constant/adminId';

const Comment: React.FC<PostCommentProps> = ({ postId, profile }) => {
  const [content, setContent] = useState('');
  const [btnChange, setBtnChange] = useState<boolean>(false);
  const [contentChange, setContentChange] = useState<string>('');
  const [nowCommentId, setNowCommentId] = useState<string>('');

  const m = useMultilingual('communityDetail');

  const insertCommentMutation = useInsertComment();
  const updateCommentMutation = useUpdateComment();
  const deleteCommentMutation = useDeleteComment();
  const isOpenCommentMutation = useCommentIsOpen();

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

  const userMenuOnBlur = (id: string) => {
    setTimeout(() => {
      isOpenCommentMutation.mutate({ isOpen: true, id });
    }, 200);
  };

  const handleIsOpenBtn = (isOpen: boolean, id: string) => {
    isOpenCommentMutation.mutate({ isOpen, id });
  };

  const handleIsOpenUpdateBtn = (content: string, isOpen: boolean, id: string) => {
    setBtnChange(!btnChange);
    setContentChange(content);
    isOpenCommentMutation.mutate({ isOpen, id });
  };

  const handleIsOpenChangeBtn = (content: string, id: string) => {
    setBtnChange(!btnChange);
    setContentChange(content);
    setNowCommentId(id);
    isOpenCommentMutation.mutate({ isOpen: true, id });
  };

  return (
    <div>
      <div>
        {postCommentList?.map((prev) => {
          return (
            <div className="sm:pt-4 pt-8 flex gap-2 border-solid border-b border-grayColor2" key={prev.id}>
              <Image
                src={`${profileStorageUrl}/${prev.profiles?.avatar_img_url || '프로필이미지'}`}
                alt="프로필이미지"
                width={50}
                height={50}
                className="sm:w-[40px] sm:h-[40px] sm:ml-4 w-[50px] h-[50px] rounded-full overflow-hidden object-cover"
              />
              <div className="flex flex-col justify-center text-blackColor">
                <p className="pb-2 font-semibold">{prev.profiles?.nickname}</p>

                {btnChange && nowCommentId === prev.id ? (
                  <div className="sm:w-[70vw]">
                    <textarea
                      className="resize-none focus:outline-none border-solid border border-grayColor2"
                      value={contentChange}
                      onChange={(e) => setContentChange(e.target.value)}
                      placeholder="Reply to comment…"
                    />
                  </div>
                ) : (
                  <div className="sm:w-[70vw]">
                    <p>{prev.content}</p>
                    <div className="text-gray-400 my-2">
                      <p>{formatCommentDateToLocal(prev.created_at)}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between ml-auto">
                <div className="sm:hidden">
                  {profile &&
                    ((prev.id && profile.id === prev.author_id) ||
                    ADMIN.some((admin) => admin.id === profile?.email) ? (
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
                  {profile && (profile.id === prev.author_id || ADMIN.some((admin) => admin.id === profile?.email)) ? (
                    <div className="relative">
                      <button
                        onClick={() => handleIsOpenBtn(prev.isOpen, prev.id)}
                        onBlur={() => userMenuOnBlur(prev.id)}
                        className="focus:outline-none"
                      >
                        <HiDotsVertical />
                      </button>
                      {prev.isOpen &&
                        (btnChange && prev.id === nowCommentId ? (
                          <div className="absolute flex flex-col right-0 mt-2 py-2 w-20 border-solid border border-pointColor1 bg-white rounded-md z-20">
                            <button className="pr-2 font-bold" onClick={() => handleUpdateBtn(prev.id)}>
                              {m('COMMUNITY_COMMENT_SAVE')}
                            </button>
                            <hr className="border-t border-0.5 border-pointColor1" />
                            <button
                              className="pl-2 font-bold"
                              onClick={() => {
                                handleIsOpenUpdateBtn(prev.content, prev.isOpen, prev.id);
                              }}
                            >
                              {m('COMMUNITY_COMMENT_CANCEL')}
                            </button>
                          </div>
                        ) : (
                          <div className="absolute flex flex-col right-0 mt-2 py-2 w-20 border-solid border border-pointColor1 bg-white rounded-md z-20">
                            <button className="font-bold" onClick={() => handleIsOpenChangeBtn(prev.content, prev.id)}>
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

      <div className="sm:pb-20 my-8 sm:block hidden">
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
