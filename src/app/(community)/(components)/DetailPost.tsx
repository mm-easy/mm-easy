import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import Comment from './Comment';
import Like from './Like';
import CategorySelector from './CategorySelector';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { getFilterPosts, getPostCategoryDetail, getPostDetail, getPosts } from '@/api/posts';
import { isLoggedInAtom } from '@/store/store';
import { PostDeleteButton } from '@/components/common/PostDeleteButton';
import { PostEditButton } from '@/components/common/PostEditButton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase/supabase';

import type { Params, Post, PostDetailDateType } from '@/types/posts';
import type { User } from '@/types/users';
import { useQuery } from '@tanstack/react-query';

const DetailPost = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [profile, setProfile] = useState<User | null>();

  const params = useParams<Params>();
  const categoryNow = decodeURIComponent(params.category);
  const router = useRouter();

  const { getCurrentUserProfile } = useAuth();

  const { data: post } = useQuery<PostDetailDateType>({
    queryFn: async () => {
      try {
        let data;
        let nextPosts;
        if (categoryNow === '전체') {
          data = await getPostDetail(params.id);
          nextPosts = await getPosts();
        } else {
          data = await getPostCategoryDetail(categoryNow, params.id);
          nextPosts = await getFilterPosts(categoryNow);
        }
        return data;
      } catch (error) {
        return;
      }
    },
    queryKey: ['post']
  });

  const { data: nextBeforePost = [] } = useQuery<Post[]>({
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
    },
    queryKey: ['postPage']
  });

  /** 이전글 가기 */
  const beforePostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);

    if (nowPostNum + 1 === nextBeforePost.length) {
      toast.warning('첫 게시물 입니다!');
      return;
    } else {
      router.push(`/community-list/${categoryNow}/${nextBeforePost[nowPostNum + 1].id}`);
    }
  };

  /** 다음글 가기 */
  const nextPostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);
    if (nowPostNum - 1 < 0) {
      toast.warning('가장 최신글 입니다!');
      return;
    } else {
      router.push(`/community-list/${categoryNow}/${nextBeforePost[nowPostNum - 1].id}`);
    }
  };

  useEffect(() => {
    // let data;
    // let nextPosts;
    // const postDetailDate = async () => {
    //   if (categoryNow === '전체') {
    //     data = await getPostDetail(params.id);
    //     nextPosts = await getPosts();
    //   } else {
    //     data = await getPostCategoryDetail(categoryNow, params.id);
    //     nextPosts = await getFilterPosts(categoryNow);
    //   }

    //   setPost(data);
    //   setNextBeforePost(nextPosts);
    // };
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
    // postDetailDate();
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

  return (
    <article className="grid grid-cols-[16%_84%]">
      <div>
        <CategorySelector categoryNow={categoryNow} />
      </div>
      <div className="flex bg-bgColor1 text-pointColor1">
        <div className="py-16 px-48 border-l-2 border-solid w-full border-pointColor1 bg-white">
          {post && post.profiles && (
            <div>
              <div className="flex justify-between">
                <p className="text-lg font-bold">{post.category}</p>
              </div>
              <h1 className="text-3xl font-bolder font-bold text-blackColor ">{post.title}</h1>
              <div className="flex border-solid border-b justify-between ">
                <div className="flex">
                  <div className="w-50 h-50 m-3 ml-0 rounded-full overflow-hidden">
                    <Image
                      src={post.profiles.avatar_img_url}
                      alt="프로필이미지"
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-blackColor">
                    <p>{post.profiles.nickname}</p>
                    <time className="text-sm">{formatToLocaleDateTimeString(post.created_at)}</time>
                  </div>
                </div>
                <div className="flex items-center">
                  {profile && post.author_id === profile.id && (
                    <div className="flex">
                      <div>
                        <PostEditButton
                          text="수정"
                          postId={post.id}
                          redirectUrl={`/community-list/${categoryNow}/${post.id}/edit`}
                          width="w-20"
                          height="h-12"
                        />
                      </div>
                      <div className="pl-3">
                        <PostDeleteButton
                          text="삭제"
                          redirectUrl={`/community-list?category=${categoryNow}`}
                          postId={post.id}
                          width="w-20"
                          height="h-12"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p
                className="my-5 ql-editor text-blackColor"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              ></p>
              <div className="flex items-center pt-4">
                <div className="flex ml-auto items-center">
                  <Like postId={params.id} profile={profile} />
                </div>
              </div>
              <div className="border-solid border-t pt-3">
                <span className="text-lg font-bold">댓글</span>
                <Comment postId={params.id} profile={profile} />
              </div>
              <div className="pt-10 flex justify-center item items-center text-xl font-bold gap-10">
                <button onClick={() => nextPostBtn(post.id)}>&#9664;</button>
                <Link href={`/community-list?category=${categoryNow}`}>목록으로</Link>
                <button onClick={() => beforePostBtn(post.id)}>&#9654;</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default DetailPost;
