import React from 'react';
import CategorySelector from '@/app/(components)/CategorySelector';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  params: {
    category: string;
  };
};

const Layout = ({ children, params }: Props) => {
  const category = decodeURIComponent(params.category);
  return (
    <main className="grid grid-cols-[16%_84%] h-[84vh]">
      <section className="flex flex-col justify-between h-[84vh] bg-bgColor1 border-r-2 border-solid border-pointColor1">
        <div>
          <CategorySelector categoryNow={category} />
        </div>
        <div className="flex justify-center w-full pb-4 font-bold">
          <Link
            href="/community-list/write"
            type="button"
            className={`rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white `}
          >
            작성하기
          </Link>
        </div>
      </section>
      {children}
    </main>
  );
};

export default Layout;