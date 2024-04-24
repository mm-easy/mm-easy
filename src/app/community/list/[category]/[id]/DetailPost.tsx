import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import Comment from './Comment';
import Like from './Like';
import ReportButton from '@/components/common/ReportButton';
import LoadingImg from '@/components/common/LoadingImg';
import PageUpBtn from '@/components/common/PageUpBtn';
import useMultilingual from '@/utils/useMultilingual';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { getFilterPosts, getPostCategoryDetail, getPostDetail, getPosts } from '@/api/posts';
import { isLoggedInAtom } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { PostEditButton } from '@/components/common/EditButton';
import { PostDeleteButton } from '@/components/common/DeleteButton';
import { DropdownMenu } from '@/components/common/DropdownMenu';
import { MobileHeader } from '@/components/common/MobileHeader';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { formatToLocaleDateTimeString } from '@/utils/date';

import type { PostParams, Post, PostDetailDateType } from '@/types/posts';
import type { User } from '@/types/users';

const DetailPost = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [profile, setProfile] = useState<User | null>();
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const params = useParams<PostParams>();
  const categoryNow = decodeURIComponent(params.category);
  const router = useRouter();
  const { getCurrentUserProfile } = useAuth();
  const m = useMultilingual('communityDetail');

  const { data: post, isLoading } = useQuery<PostDetailDateType>({
    queryKey: ['posts', params.id],
    queryFn: async () => {
      try {
        let data;
        if (categoryNow === '전체') {
          data = await getPostDetail(params.id);
        } else {
          data = await getPostCategoryDetail(categoryNow, params.id);
        }
        return data;
      } catch (error) {
        return;
      }
    }
  });
  const { data: nextBeforePost = [] } = useQuery<Post[]>({
    queryKey: ['postPage'],
    queryFn: async () => {
      try {
        let nextPosts;
        if (categoryNow === '전체') {
          nextPosts = await getPosts();
        } else {
          nextPosts = await getFilterPosts(categoryNow);
        }
        return nextPosts;
      } catch (error) {
        return [];
      }
    }
  });
  /** 이전글 가기 */
  const beforePostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);
    if (nowPostNum + 1 === nextBeforePost.length) {
      toast.warning(m('COMMUNITY_NO_MORE_POST'));
      return;
    } else {
      router.push(`/community/list/${categoryNow}/${nextBeforePost[nowPostNum + 1].id}`);
    }
  };
  /** 다음글 가기 */
  const nextPostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);
    if (nowPostNum - 1 < 0) {
      toast.warning(m('COMMUNITY_LATEST_POST'));
      return;
    } else {
      router.push(`/community/list/${categoryNow}/${nextBeforePost[nowPostNum - 1].id}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        if (!getSession.data.session) {
          return;
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchData();
  }, []);
  /** 로그인이 되어 있다면 프로필 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      if (isLoggedIn) {
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile);
      } else {
        setProfile(null); // 로그아웃 상태에서는 사용자 정보를 null로 설정
      }
    };
    fetchData();
  }, [isLoggedIn]);

  if (isLoading) return <LoadingImg height="84vh" />;

  return (
    <>
      <div className="sm:w-full sm:bg-pointColor1">
        <div className="flex bg-bgColor1 text-pointColor1">
          <div className="sm:py-0 py-16 sm:px-0 px-[5vw] w-full bg-white">
            {post && post.profiles && (
              <>
                <MobileHeader backPage={`/community/list/${categoryNow}`} text={post.category} />
                <div>
                  <div className="flex sm:hidden justify-between">
                    <p className="text-lg font-bold">{post.category}</p>
                    <p className="text-sm font-semibold">
                      {m('COMMUNITY_VIEWS')} {post.view_count}
                    </p>
                  </div>
                  <h1 className="sm:text-xl text-3xl sm:px-5 sm:py-0 sm:pt-4 py-2 font-bolder font-bold text-blackColor ">
                    {post.title}
                  </h1>
                  <div className="flex border-solid border-b justify-between ">
                    <div className="flex sm:px-5">
                      <div className="sm:w-[40px] sm:h-[40px] w-[50px] h-[50px] m-3 ml-0 rounded-full overflow-hidden">
                        <Image
                          src={`${profileStorageUrl}/${post.profiles.avatar_img_url}`}
                          alt="프로필이미지"
                          width={50}
                          height={50}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center text-blackColor">
                        <p className="font-medium sm:text-sm text-lg">{post.profiles.nickname}</p>
                        <time className="text-sm">{formatToLocaleDateTimeString(post.created_at)}</time>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {profile && (post.author_id === profile.id || profile?.email === 'daejang@mmeasy.com') && (
                        <>
                          <DropdownMenu
                            editBtn={
                              <PostEditButton
                                text={m('COMMUNITY_POST_EDIT')}
                                postId={post.id}
                                redirectUrl={`/community/list/${categoryNow}/${post.id}/edit`}
                                width="w-20"
                                height="h-12"
                              />
                            }
                            deleteBtn={
                              <PostDeleteButton
                                text={m('COMMUNITY_POST_DELETE')}
                                redirectUrl={'/community/list/전체'}
                                postId={post.id}
                                width="w-20"
                                height="h-12"
                              />
                            }
                          />
                          <div className="flex sm:hidden">
                            <div>
                              <PostEditButton
                                text={m('COMMUNITY_POST_EDIT')}
                                postId={post.id}
                                redirectUrl={`/community/list/${categoryNow}/${post.id}/edit`}
                                width="w-20"
                                height="h-12"
                              />
                            </div>
                            <div className="pl-3">
                              <PostDeleteButton
                                text={m('COMMUNITY_POST_DELETE')}
                                redirectUrl={'/community/list/전체'}
                                postId={post.id}
                                width="w-20"
                                height="h-12"
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <p
                    className="leading-9 sm:px-5 my-5 ql-editor text-blackColor"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                  ></p>
                  <div className="sm:px-5 py-4 flex justify-between">
                    <div className="font-semibold">
                      <Like postId={params.id} profile={profile} />
                    </div>
                    <div className="font-semibold">
                      {profile && profile.email !== post.profiles.email && (
                        <ReportButton
                          targetId={params.id}
                          type="post"
                          currentUserEmail={profile.email}
                          title={post.title}
                          creatorId={post.profiles.email}
                        >
                          {m('COMMUNITY_REPORTS')}
                        </ReportButton>
                      )}
                    </div>
                  </div>
                  <div className="border-solid border-t pt-3">
                    <span className="text-lg font-bold px-5">{m('COMMUNITY_COMMENTS')}</span>
                    <Comment postId={params.id} profile={profile} />
                  </div>
                  <div className="sm:hidden pt-10 flex justify-center item items-center font-bold gap-10">
                    <button onClick={() => nextPostBtn(post.id)}>&#9664;</button>
                    <Link href={`/community/list/${categoryNow}`}>{m('COMMUNITY_BACK_TO_LIST')}</Link>
                    <button onClick={() => beforePostBtn(post.id)}>&#9654;</button>
                  </div>
                </div>
              </>
            )}
          </div>
          <PageUpBtn scrollPosition={scrollPosition} />
        </div>
      </div>
    </>
  );
};

export default DetailPost;
