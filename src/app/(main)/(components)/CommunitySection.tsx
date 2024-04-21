import Link from 'next/link';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { getRecentPosts, getRecentNotice } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

const CommunitySection = () => {
  const m = useMultilingual('community-section');

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: getRecentPosts,
    staleTime: 1000 * 60 * 5
  });

  const { data: notices, isLoading: noticesLoading } = useQuery({
    queryKey: ['recentNotice'],
    queryFn: getRecentNotice,
    staleTime: 1000 * 60 * 5
  });

  if (postsLoading || noticesLoading) {
    return <LoadingImg height="400px" />;
  }

  return (
    <>
      <p className="w-[1440px] px-6 py-4 text-lg font-bold text-pointColor1 bg-bgColor1 border-y-2 border-solid border-pointColor1">
        {m('RECENT_POSTS')}
      </p>
      <section className="flex">
        <div className="w-1/2 p-8 border-r border-solid border-pointColor1">
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-bold">{m('NOTICE')}</h2>
            <Link href={`/community/list/공지`} className="font-semibold text-pointColor1">
              {m('MORE')}
            </Link>
          </div>
          <div>
            {notices?.map((notice, index) => (
              <div
                key={notice.id}
                className={`py-4 ${index !== notices.length - 1 && 'border-b border-solid border-pointColor1'}`}
              >
                <Link href={`/community/list/전체/${notice.id}`} className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold truncate">{notice.title}</h2>
                  <time>
                    {m('DATE_CREATION')}: {formatToLocaleDateTimeString(notice.created_at)}
                  </time>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 p-8">
          <div className="flex justify-between">
            <h2 className="mb-4 text-lg font-bold">{m('USER_POSTS')}</h2>
            <Link href={`/community/list/전체`} className="font-semibold text-pointColor1">
              {m('MORE')}
            </Link>
          </div>
          <div>
            {posts?.map((post, index) => (
              <div
                key={post.id}
                className={`py-4 ${index !== posts.length - 1 && 'border-b border-solid border-pointColor1'}`}
              >
                <Link href={`/community/list/전체/${post.id}`} className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold truncate">{post.title}</h2>
                  <time>
                    {m('DATE_CREATION')}: {formatToLocaleDateTimeString(post.created_at)}
                  </time>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunitySection;
