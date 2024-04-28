import Image from 'next/image';
import loadingImg from '@/assets/loadingWebP.webp';

const LoadingImg = ({ height }: { height: string }) => {
  const cloudinaryImgUrl = "https://res.cloudinary.com/doqfofexn/image/upload/v1714325766/loadingWebP_elmaaz.webp"
  return (
    <div className={`flex flex-col items-center justify-center h-[${height}]  bg-bgColor2`}>
      <Image src={cloudinaryImgUrl} alt="로딩이미지" width={200} height={200} />
      <div className="text-2xl font-bold text-pointColor3">잠시만 기다려 주세요</div>
    </div>
  );
};

export default LoadingImg;
