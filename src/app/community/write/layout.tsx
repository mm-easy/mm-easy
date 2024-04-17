import CategorySelector from '@/app/community/list/[category]/CategorySelector';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="bg-bgColor1 grid grid-cols-[16%_84%] h-[84vh]">
      <section className="h-[84vh] flex flex-col justify-between bg-bgColor1">
        <div>
          <CategorySelector categoryNow={''} />
        </div>
      </section>
      {children}
    </main>
  );
};

export default Layout;
