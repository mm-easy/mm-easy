import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { getRecentPosts, getRecentNotice } from '@/api/posts';
import { useQuery } from '@tanstack/react-query';

const CommunitySection = () => {
  const m = useMultilingual('community-section');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('notice');

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

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 580);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (postsLoading || noticesLoading) {
    return <LoadingImg height="400px" />;
  }

  return (
    <>
      <div className="w-full px-6 py-4 text-lg font-bold text-pointColor1 bg-bgColor1 border-y-2 border-solid border-pointColor1 sm:hidden">
        <span className="sm:text-xl">{m('RECENT_POSTS')}</span>
      </div>
      {isSmallScreen ? (
        <div className="">
          <div className="w-full px-6 py-4 text-lg font-bold text-pointColor1 bg-bgColor1 flex justify-between border-t-2 border-solid border-pointColor1">
            <span className="sm:text-xl">{m('RECENT_POSTS')}</span>
            <div className="flex">
              <button
                onClick={() => setActiveTab('notice')}
                className={`mr-2 px-2 font-bold text-sm border-2 border-solid border-pointColor1 rounded-full ${
                  activeTab === 'notice' ? 'bg-pointColor1 text-white' : 'bg-white text-pointColor1'
                }`}
              >
                {m('NOTICE_BUTTON')}
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-2 font-bold text-sm border-2 border-solid border-pointColor1 rounded-full ${
                  activeTab === 'posts' ? 'bg-pointColor1 text-white' : 'bg-white text-pointColor1'
                }`}
              >
                {m('USER_POSTS_BUTTON')}
              </button>
            </div>
          </div>
          {activeTab === 'notice' && (
            <div className="p-4 bg-bgColor1 border-solid border-b-2 border-pointColor1">
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
          )}
          {activeTab === 'posts' && (
            <div className="p-4 bg-bgColor1 border-solid border-b-2 border-pointColor1">
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
          )}
        </div>
      ) : (
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
      )}
    </>
  );
};

export default CommunitySection;
