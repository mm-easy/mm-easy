import Image from 'next/image';
import LogoVertical3 from '@/assets/logo_vertical_3.png';

const Banner = () => {
  return (
    <main className="w-full h-[400px] border-solid border-b-2 border-pointColor1">
      <div className="pt-[80px] flex items-center justify-center gap-5">
        <Image src={LogoVertical3} alt="로고" width={150} quality={100} />
        <section className="text-4xl font-bold text-pointColor1">
          지금 이 한국어, 뭔말인지 아는 그날까지!
          <br />
          <span className="text-2xl font-normal text-black">다함께 만들어 공유하는 재미있는 한국어 퀴즈 세상</span>
        </section>
      </div>
    </main>
  );
};

export default Banner;
