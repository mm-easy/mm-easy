import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import Comment from './Comment';
import Like from './Like';
import CategorySelector from './CategorySelector';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { getFilterPosts, getPostCategoryDetail, getPostDetail, getPosts } from '@/api/posts';

import type { Post, PostDetailDateType } from '@/types/posts';
import { PostDeleteButton } from '@/components/common/PostDeleteButton';
import { PostEditButton } from '@/components/common/PostEditButton';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

const DetailPost = () => {
  const { getCurrentUserProfile } = useAuth();
  const [post, setPost] = useState<PostDetailDateType>();
  const [nextBeforePost, setNextBeforePost] = useState<Post[]>([]);

  type Params = {
    category: string;
    id: string;
  };

  const { data: profile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getCurrentUserProfile
  });

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

    postDetailDate();
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
    if (nowPostNum - 1 < 0) {
      toast.warning('가장 최신글 입니다!');
      return;
    } else {
      router.push(`/community-list/${categoryNow}/${nextBeforePost[nowPostNum - 1].id}`);
    }
  };

  return (
    <article>
      <div className="flex bg-bgColor1 text-pointColor1">
        <div>
          <CategorySelector categoryNow={categoryNow} />
        </div>
        <div className="py-10 px-20 border border-solid border-t-0 border-r-0 border-b-0 w-full border-pointColor1 bg-white">
          {post && post.profiles && (
            <div>
              <div className="flex justify-between">
                <p className='text-lg font-bold'>{post.category}</p>
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
                    <div className='flex'>
                      <div>
                        <PostEditButton
                          text="수정"
                          postId={post.id}
                          redirectUrl={`/community-list/${categoryNow}/${post.id}/edit`}
                          width="w-20"
                          height="h-12"
                        />
                      </div>
                      <div className='pl-3'>
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
                  <Like postId={params.id} />
                </div>
              </div>
              <div className="border-solid border-t pt-3">
                <span className="text-lg font-bold">댓글</span>
                <Comment postId={params.id} />
              </div>
              <div className="flex justify-center item items-center">
                <button onClick={() => nextPostBtn(post.id)}>
                  <IoMdArrowDropleft />
                </button>
                <Link href={`/community-list?category=${categoryNow}`}>목록으로</Link>
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
