import Image from 'next/image';
import logoVertical3 from '@/assets/logo_vertical_3.png';

const Footer = () => {
  return (
    <main className="bg-pointColor1 text-white p-8 flex flex-col justify-center items-center">
      <div className="w-5/6">
        <div className="text-5xl font-black tracking-widest m-4">뭔말이지? 뭔말easy!</div>
        <p className="mt-2 text-3xl m-4">퀴즈와 게임으로 쉽고 재미있게 배우는 한국어~ :P</p>
        <div className="flex ml-4 items-end">
          <div>
            <Image src={logoVertical3} alt="사이트 로고" width={170} />
          </div>
          <div className="ml-4 mt-20">
            <p className="text-lg">제작 | coding zizon</p>
            <p className="text-lg">문의 | redbery0217@gmail.com</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;
