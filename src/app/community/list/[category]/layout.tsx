'use client';

import React from 'react';
import CategorySelector from '@/app/community/list/[category]/CategorySelector';
import Link from 'next/link';
import useMultilingual from '@/utils/useMultilingual';
import { useParams } from 'next/navigation';
import { Params } from '@/types/posts';

type Props = {
  children: React.ReactNode;
  params: {
    category: string;
  };
};

const Layout = ({ children, params }: Props) => {
  const category = decodeURIComponent(params.category);
  const m = useMultilingual('communityList');
  const params2 = useParams<Params>();
  console.log(params2.id);

  return (
    <main className="bg-bgColor1 grid grid-cols-[16%_84%] sm:block sm:w-[100%] h-[84%]">
      <section className="sm:pt-4 sm:h-auto sm:bg-white sm:border-b-1 sm:border-pointColor1 sm:border-solid h-[84vh] justify-between bg-bgColor1">
        <div>{!params2.id && <CategorySelector categoryNow={category} />}</div>
        <div className="flex justify-center w-full pb-4 font-bold mt-10 sm:hidden">
          <Link
            href="/community/write"
            type="button"
            className="flex justify-center items-center rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white w-32 h-12"
          >
            {m('COMMUNITY_CREATE_POST')}
          </Link>
        </div>
      </section>
      {children}
    </main>
  );
};

export default Layout;
