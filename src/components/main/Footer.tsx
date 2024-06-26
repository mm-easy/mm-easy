import Image from 'next/image';
import Link from 'next/link';
import logoVertical4 from '@/assets/logo/logo_vertical_4.png';
import useMultilingual from '@/utils/useMultilingual';

const Footer = () => {
  const m = useMultilingual('main-footer');

  return (
    <footer className="p-8 flex gap-8 text-white bg-pointColor1 border-b-2 border-solid border-white sm:px-6 sm:py-2 sm:pb-[10vh] sm:border-0">
      <Image src={logoVertical4} alt="사이트 로고" width={300} quality={100} className="object-cover block sm:hidden" />
      <article className="py-5 flex flex-col justify-between">
        <section>
          <div className="mb-2 text-5xl font-black sm:text-4xl sm:bold">뭔말이지? 뭔말easy!</div>
          <p className="text-3xl sm:text-xl sm:font-semibold">{m('INTRODUCTION_1')}</p>
        </section>
        <section className="pb-1 block sm:hidden">
          <p className="text-lg">{m('INTRODUCTION_2')}</p>
          <p className="text-lg">{m('INTRODUCTION_3')}</p>
        </section>
        <article className="flex gap-4 mt-4">
          <section>
            <Image
              src={logoVertical4}
              alt="사이트 로고"
              width={100}
              height={50}
              quality={100}
              className="object-cover hidden sm:block"
            />
          </section>
          <section className="pb-1 hidden sm:block">
            <p className="text-sm font-semibold">{m('INTRODUCTION_2')}</p>
            <p className="text-sm font-semibold mb-2">{m('INTRODUCTION_3')}</p>
          </section>
        </article>
      </article>
    </footer>
  );
};

export default Footer;
