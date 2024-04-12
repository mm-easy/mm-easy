import { formatToLocaleDateTimeString } from '@/utils/date';
import { getRecentPosts } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const CommunitySection = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: getRecentPosts,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <div className="p-4 text-lg text-pointColor1 bg-bgColor1 font-bold border-y-2 border-solid border-pointColor1">
        <div className="flex items-center justify-center">
          <p className="w-5/6 ml-10">최근 올라온 글</p>
        </div>
      </div>
      <section className="flex flex-col justify-center items-center">
        <div className="w-5/6 flex">
          <div className="w-1/2 p-8 border-r border-solid border-pointColor1">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold">공지</h2>
              <Link href={`/community-list?category=전체`} className="font-semibold text-pointColor1">
                더보기
              </Link>
            </div>
            <div>
              {posts?.map((post, index) => (
                <div
                  key={post.id}
                  className={`py-4 ${index !== posts.length - 1 && 'border-b border-solid border-pointColor1'}`}
                >
                  <Link href={`/community-list/전체/${post.id}`} className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <time>작성일: {formatToLocaleDateTimeString(post.created_at)}</time>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 p-8">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold">유저가 쓴 글</h2>
              <Link href={`/community-list?category=전체`} className="font-semibold text-pointColor1">
                더보기
              </Link>
            </div>
            <div>
              {posts?.map((post, index) => (
                <div
                  key={post.id}
                  className={`py-4 ${index !== posts.length - 1 && 'border-b border-solid border-pointColor1'}`}
                >
                  <Link href={`/community-list/전체/${post.id}`} className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <time>작성일: {formatToLocaleDateTimeString(post.created_at)}</time>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunitySection;
