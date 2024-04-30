import CategorySelector from '@/app/community/list/[category]/CategorySelector';

type Props = {
  children: React.ReactNode;
};

/** 카테고리 레이아웃 */
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
