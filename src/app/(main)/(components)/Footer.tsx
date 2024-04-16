import Image from 'next/image';
import logoVertical4 from '@/assets/logo_vertical_4.png';

const Footer = () => {
  return (
    <main className="p-8 flex gap-8 text-white bg-pointColor1 border-b-2 border-solid border-white">
      <Image src={logoVertical4} alt="사이트 로고" width={300} className="object-cover" />
      <article className="py-5 flex flex-col justify-between">
        <section>
          <div className="mb-2 text-5xl font-black tracking-widest">뭔말이지? 뭔말easy!</div>
          <p className="text-3xl">퀴즈와 게임으로 쉽고 재미있게 배우는 한국어~ :P</p>
        </section>
        <section>
          <p className="text-lg">제작 | coding zizon</p>
          <p className="text-lg">문의 | redbery0217@gmail.com</p>
        </section>
      </article>
    </main>
  );
};

export default Footer;
