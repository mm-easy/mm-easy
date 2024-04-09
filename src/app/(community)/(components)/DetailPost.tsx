import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import Comment from './Comment';
import Like from './Like';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { getFilterPosts, getPostCategoryDetail, getPostDetail, getPosts } from '@/api/posts';

import type { Post, PostDetailDateType } from '@/types/posts';
import { User } from '@supabase/supabase-js';
import CategorySelector from './CategorySelector';
import { supabase } from '@/utils/supabase/supabase';

const DetailPost = () => {
  const [post, setPost] = useState<PostDetailDateType>();
  const [nextBeforePost, setNextBeforePost] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<{ user: User } | null>(null);

  type Params = {
    category: string;
    id: string;
  };

  const params = useParams<Params>();
  const categoryNow = decodeURIComponent(params.category);
  const router = useRouter();

  /**해당 게시글 정보가져오기 */
  useEffect(() => {
    let data;
    let nextPosts;
    const postDetailDate = async () => {
      if (categoryNow === '전체') {
        data = await getPostDetail(params.id);
        nextPosts = await getPosts();
      } else {
        data = await getPostCategoryDetail(categoryNow, params.id);
        nextPosts = await getFilterPosts(categoryNow);
      }
      setPost(data);
      setNextBeforePost(nextPosts);
    };
    // const nextPosts = async () => {
    //   const allPost = await getPosts();
    //   setNextBeforePost(allPost);
    // };

    postDetailDate();
    // nextPosts();
  }, []);

  useEffect(() => {
    // 현재 로그인한 사용자 정보 가져오기
    const fetchUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        // 오류 처리
        console.error('Error fetching user:', error);
      } else {
        setCurrentUser(user);
      }
    };

    fetchUser();
  }, []);

  const beforePostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);

    if (nowPostNum + 1 === nextBeforePost.length) {
      toast.warning('첫 게시물 입니다!');
      return;
    } else {
      router.push(`/community-list/${categoryNow}/${nextBeforePost[nowPostNum + 1].id}`);
    }
  };

  const nextPostBtn = (postId: string) => {
    const nowPostNum = nextBeforePost.findIndex((prev) => prev.id === postId);
    console.log(nowPostNum);
    if (nowPostNum - 1 < 0) {
      toast.warning('가장 최신글 입니다!');
      return;
    } else {
      router.push(`/community-list/${categoryNow}/${nextBeforePost[nowPostNum - 1].id}`);
    }
  };

  const navigateToPostPage = (postId: string) => {
    router.push(`/community-list/${categoryNow}/${postId}/edit`);
  };

  return (
    <article>
      <div className="flex bg-bgColor1 justify-center text-pointColor1 pb-12">
        {/* <CommunityMenu /> */}
        <CategorySelector />
        <div className="py-10 bg-white px-20 border-2 border-solid border-t-0 border-r-0 border-pointColor1 w-full">
          {post && post.profiles && (
            <div>
              <div className="flex justify-between">
                <p>{post.category}</p>
              </div>
              <h1 className="text-2xl font-bolder">{post.title}</h1>
              <div className="flex border-solid border-b-2 justify-between ">
                <div className="flex">
                  <div className="m-5 w-70 h-70 rounded-full overflow-hidden border-2 border-solid border-pointColor1">
                    <Image
                      src={post.profiles.avatar_img_url}
                      alt="프로필이미지"
                      width={70}
                      height={70}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-blackColor">
                    <p>{post.profiles.nickname}</p>
                    <time>{formatToLocaleDateTimeString(post.created_at)}</time>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex">
                    {/* 사용자 확인 후 조건부 렌더링 */}
                    {currentUser && post && currentUser.user.id === post.author_id && (
                      <button onClick={() => navigateToPostPage(post.id)}>수정</button>
                    )}
                    <button>삭제</button>
                  </div>
                </div>
              </div>
              <p
                className="ql-editor m-5 text-blackColor"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
              ></p>
              <div className="flex items-center">
                <div className="flex ml-auto items-center">
                  <Like postId={params.id} />
                </div>
              </div>
              <div className="border-solid border-t-2">
                <span>댓글</span>
                <Comment postId={params.id} />
              </div>
              <div className="flex justify-center item items-center">
                <button onClick={() => nextPostBtn(post.id)}>
                  <IoMdArrowDropleft />
                </button>
                <Link href="/community-list">목록으로</Link>
                <button onClick={() => beforePostBtn(post.id)}>
                  <IoMdArrowDropright />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default DetailPost;
