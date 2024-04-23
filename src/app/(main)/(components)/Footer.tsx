import Image from 'next/image';
import logoVertical4 from '@/assets/logo_vertical_4.png';
import useMultilingual from '@/utils/useMultilingual';
import { useAtom } from 'jotai';
import { langAtom } from '@/store/store';

const Footer = () => {
  const [lang] = useAtom(langAtom);
  const m = useMultilingual('main-footer');

  return (
    <main className="p-8 flex gap-8 text-white bg-pointColor1 border-b-2 border-solid border-white">
      <Image src={logoVertical4} alt="사이트 로고" width={300} quality={100} className="object-cover" />
      <article className="py-5 flex flex-col justify-between">
        <section>
          <div className="mb-2 text-5xl font-black tracking-widest">뭔말이지? 뭔말easy!</div>
          <p className="text-3xl">{m('INTRODUCTION_1')}</p>
        </section>
        <section className="pb-1">
          <p className="text-lg">{m('INTRODUCTION_2')}</p>
          <p className="text-lg">{m('INTRODUCTION_3')}</p>
        </section>
      </article>
    </main>
  );
};

export default Footer;
