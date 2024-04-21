'use client'

import React from 'react';
import CategorySelector from '@/app/community/list/[category]/CategorySelector';
import Link from 'next/link';
import useMultilingual from '@/utils/useMultilingual';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';


type Props = {
  children: React.ReactNode;
  params: {
    category: string;
  };
};

const Layout = ({ children, params }: Props) => {
  const category = decodeURIComponent(params.category);
  const [lang] = useAtom(langAtom);
  const m = useMultilingual(lang, 'communityList');
  
  return (
    <main className="bg-bgColor1 grid grid-cols-[16%_84%] h-[84%]">
      <section className="h-[84vh] justify-between bg-bgColor1">
        <div>
          <CategorySelector categoryNow={category} />
        </div>
        <div className="flex justify-center w-full pb-4 font-bold mt-10">
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
