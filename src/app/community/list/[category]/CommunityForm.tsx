'use client';

import React from 'react';
import useMultilingual from '@/utils/useMultilingual';
import { useRouter } from 'next/navigation';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useMemo } from 'react';
import { getCommentCount } from '@/api/comment';
import { useQueries } from '@tanstack/react-query';

import type { CommunityFormProps } from '@/types/posts';
import { getLike } from '@/api/likes';
import Link from 'next/link';

const CommunityForm: React.FC<CommunityFormProps> = ({
  currentItems,
  setCurrentPage,
  currentPage,
  totalNum,
  pageRange,
  btnRange,
  category
}) => {
  const m = useMultilingual('communityList');
  const router = useRouter();

  const sortedItems = useMemo(() => {
    return [...currentItems].sort((a, b) => {
      if (a.category === '공지' && b.category !== '공지') {
        return -1; // a가 공지이면, b보다 앞에 오도록 정렬
      }
      if (a.category !== '공지' && b.category === '공지') {
        return 1; // b가 공지이면, a보다 앞에 오도록 정렬
      }
      return 0; // 두 항목이 모두 공지이거나 공지가 아닐 경우 기본 순서 유지
    });
  }, [currentItems]);

  // 게시글 상세 페이지로 이동
  const navigateToDetailPost = (post: { id: string }): void => {
    if (category === null) {
      router.push(`/community/list/전체/${post.id}`);
    } else {
      router.push(`/community/list/${category}/${post.id}`);
    }
  };

  const commentCounts = useQueries({
    queries: sortedItems.map((post) => ({
      queryKey: ['commentCount', post.id],
      queryFn: () => getCommentCount(post.id)
    }))
  });

  const likeQueries = useQueries({
    queries: sortedItems.map((item) => ({
      queryKey: ['like', item.id],
      queryFn: () => getLike(item.id)
    }))
  });

  const totalSet = Math.ceil(Math.ceil(totalNum / pageRange) / btnRange);
  const currentSet = Math.ceil(currentPage / btnRange);
  const startPage = (currentSet - 1) * btnRange + 1;
  const endPage = Math.min(startPage + btnRange - 1, Math.ceil(totalNum / pageRange));

  return (
    <article className="w-full">
      <div className="bg-white w-full">
        <table className="sm:hidden w-full">
          <thead className="text-left">
            <tr className="text-pointColor1 font-bold border-b-2 border-solid border-pointColor1">
              <th className="pl-6 p-4 w-[9%] ">{m('COMMUNITY_TABLE_HEADER1')}</th>
              <th className="w-[16%]">{m('COMMUNITY_TABLE_HEADER2')}</th>
              <th className="w-[50%]">{m('COMMUNITY_TABLE_HEADER3')}</th>
              <th className="w-[13%]">{m('COMMUNITY_TABLE_HEADER4')}</th>
              <th className="w-[7%]">{m('COMMUNITY_TABLE_HEADER5')}</th>
              <th className="w-[5%]">{m('COMMUNITY_TABLE_HEADER6')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems?.length > 0 ? (
              sortedItems.map((item, idx) => (
                <tr
                  className={`sm:h-[6vh] cursor-pointer text-[calc(1vh+7px)] ${
                    item['category'] === '공지'
                      ? 'font-bold bg-bgColor2 border-y border-solid border-pointColor1'
                      : 'bg-white border-grayColor2 border-y border-solid '
                  }`}
                  key={idx}
                  onClick={() => navigateToDetailPost(item)}
                >
                  <td className="pl-6 py-[calc(1.5vh+2px)]">{item['category']}</td>
                  <td>{item.profiles?.nickname || m('COMMUNITY_NICKNAME_UNKNOWN')}</td>
                  <td>
                    <span>{item.title}</span>
                    {(commentCounts[idx]?.data ?? 0) > 0 && (
                      <span className="sm:hidden text-pointColor1"> ({commentCounts[idx].data})</span>
                    )}
                  </td>
                  <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                  <td>{item['view_count']}</td>
                  <td>{likeQueries[idx].data?.length ?? 0}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan={5} className="text-center py-4">
                  {m('COMMUNITY_NO_POSTS')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* 모바일 전용 HTML */}
        <div className="lg:hidden md:hidden sm:block border-t border-solid border-pointColor1">
          {sortedItems?.length > 0 ? (
            sortedItems.map((item, idx) => (
              <div
                className={`border-b border-solid border-pointColor1 flex items-center h-[7vh] cursor-pointer ${
                  item['category'] === '공지' ? ' bg-bgColor2' : 'bg-white'
                }`}
                key={idx}
                onClick={() => navigateToDetailPost(item)}
              >
                <div>
                  <div className="font-semibold text-base">
                    <p className="truncate max-w-sm">{item.title}</p>
                  </div>
                  <div className="flex text-sm ">
                    <p>{item.profiles?.nickname || m('COMMUNITY_NICKNAME_UNKNOWN')}</p>
                    <p className="px-1">│</p>
                    <p>{formatToLocaleDateTimeString(item['created_at'])}</p>
                    <p className="px-1">│</p>
                    <p>
                      {m('COMMUNITY_TABLE_HEADER5')} {item['view_count']}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white">
              <p className="text-center py-4">{m('COMMUNITY_NO_POSTS')}</p>
            </div>
          )}
        </div>
      </div>
      <section className="flex justify-center my-[10px] px-20 w-full">
        <nav className="flex gap-10 text-base font-bold ">
          {currentSet > 1 && (
            <button className=" text-pointColor1" onClick={() => setCurrentPage(startPage - 1)}>
              &#9664;
            </button>
          )}
          {Array.from({ length: btnRange }, (_, i) => startPage + i)
            .filter((page) => page <= Math.ceil(totalNum / pageRange))
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${currentPage === page ? 'text-pointColor1' : ''}`}
              >
                {page}
              </button>
            ))}
          {totalSet > currentSet && (
            <button className="text-pointColor1" onClick={() => setCurrentPage(endPage + 1)}>
              &#9654;
            </button>
          )}
        </nav>
        <div>
          <Link
            href="/community/write"
            type="button"
            className="text-5xl flex justify-center items-center fixed bottom-30 right-6 bg-pointColor1 text-white h-16 w-16 rounded-full"
          >
            +
          </Link>
        </div>
      </section>
    </article>
  );
};

export default CommunityForm;
