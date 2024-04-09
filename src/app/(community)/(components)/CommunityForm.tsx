// CommunityForm.tsx
'use client';

import { CommunityFormProps } from '@/types/posts';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useRouter } from 'next/navigation';
import React from 'react';

const CommunityForm: React.FC<CommunityFormProps> = ({
  currentItems,
  setCurrentPage,
  currentPage,
  totalNum,
  pageRange,
  btnRange,
  category
}) => {
  const router = useRouter();

  const navigateToDetailPost = (post: { id: string }): void => {
    router.push(`/community-list/${category}/${post.id}`);
  };

  const truncateTitle = (title: string): string => {
    return title.length > 20 ? title.substring(0, 32) + ' ...' : title;
  };

  const totalSet = Math.ceil(Math.ceil(totalNum / pageRange) / btnRange);
  const currentSet = Math.ceil(currentPage / btnRange);
  const startPage = (currentSet - 1) * btnRange + 1;
  const endPage = Math.min(startPage + btnRange - 1, Math.ceil(totalNum / pageRange));

  return (
    <article className="w-full">
      <div className="bg-white p-4 w-full">
        <table className="w-full">
          <thead className="text-left">
            <tr className="text-pointColor1 font-bold border-b-2 border-solid border-pointColor1">
              <th className="p-4 w-40">구분</th>
              <th className="w-60">닉네임</th>
              <th className="w-4/6">제목</th>
              <th className="w-60">날짜</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, idx) => {
              return (
                <tr
                  className="bg-white cursor-pointer border-y border-solid border-pointColor1"
                  key={idx}
                  onClick={() => navigateToDetailPost(item)}
                >
                  <td className="p-3 w-24">{item['category']}</td>
                  <td>{item.profiles?.nickname || '알 수 없음'}</td>
                  <td>{truncateTitle(item['title'])}</td>
                  <td>{formatToLocaleDateTimeString(item['created_at'])}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="flex justify-center my-[30px] px-20 w-full">
        <nav className="flex gap-5">
          {currentSet > 1 && <button onClick={() => setCurrentPage(startPage - 1)}>&lt;</button>}
          {Array.from({ length: btnRange }, (_, i) => startPage + i)
            .filter((page) => page <= Math.ceil(totalNum / pageRange))
            .map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className="text-[16px] font-bold">
                {page}
              </button>
            ))}
          {totalSet > currentSet && <button onClick={() => setCurrentPage(endPage + 1)}>&gt;</button>}
        </nav>
      </section>
    </article>
  );
};

export default CommunityForm;
