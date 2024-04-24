import CategorySelector from '@/app/community/list/[category]/CategorySelector';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="bg-bgColor1 grid grid-cols-[16%_84%] ">
      <section className="sm:hidden h-[84vh] flex flex-col justify-between bg-bgColor1">
        <CategorySelector categoryNow={''} />
      </section>
      {children}
    </main>
  );
};

export default Layout;
