'use client';

import React from 'react';
import CategorySelector from '@/app/community/list/[category]/CategorySelector';
import Link from 'next/link';
import useMultilingual from '@/utils/useMultilingual';
import { useParams } from 'next/navigation';
import { PostParams } from '@/types/posts';

type Props = {
  children: React.ReactNode;
  params: {
    category: string;
  };
};

const Layout = ({ children, params }: Props) => {
  const category = decodeURIComponent(params.category);
  const m = useMultilingual('communityList');
  const paramsPostId = useParams<PostParams>();

  return (
    <main className="bg-bgColor1 grid grid-cols-[16%_84%] sm:block sm:w-[100%] h-[84%]">
      <div className={`sm:${paramsPostId.id ? 'hidden' : ''}`}>
        <section className="sm:pt-6 sm:h-auto sm:bg-white sm:border-b-1 sm:border-pointColor1 sm:border-solid h-[84vh] justify-between bg-bgColor1">
          <div>
            <CategorySelector categoryNow={category} />
          </div>
          <div className="sm:hidden flex justify-center w-full pb-4 font-bold mt-10">
            <Link
              href="/community/write"
              type="button"
              className="flex justify-center items-center rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white w-32 h-12"
            >
              {m('COMMUNITY_CREATE_POST')}
            </Link>
          </div>
          <div className="hidden sm:block">
            <Link
              href="/community/write"
              type="button"
              className="text-5xl flex justify-center items-center fixed bottom-16 right-6 bg-pointColor1 text-white h-16 w-16 rounded-full"
            >
              +
            </Link>
          </div>
        </section>
      </div>
      {children}
    </main>
  );
};

export default Layout;
