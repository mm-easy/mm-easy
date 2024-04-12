import Image from 'next/image';
import LogoVertical3 from '@/assets/logo_vertical_3.png';

const MainLogo = () => {
  return (
    <>
      <header className="w-full h-[400px] relative bg-bgColor2 border-solid border-b-2 border-pointColor1 flex flex-col items-center justify-center">
        <div className="flex gap-10 justify-center items-center">
          <div>
            <Image src={LogoVertical3} alt="로고" width={150} />
          </div>
          <div className="text-4xl font-bold text-pointColor1">
            지금 이 한국어, 뭔말인지 아는 그날까지!
            <br />
            <span className="text-2xl font-normal text-black">다함께 만들어 공유하는 재미있는 한국어 퀴즈 세상</span>
          </div>
          {/* <Image
          src={'https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/main-image/mainimage.jpeg'}
          alt="메인 로고"
          width={1920}
          height={400}
          className="w-full h-full object-cover"
          unoptimized
        /> */}
        </div>
      </header>
    </>
  );
};

export default MainLogo;
