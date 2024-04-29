import Image from 'next/image';
import loadingImg from '@/assets/loadingWebP.webp';
import useMultilingual from '@/utils/useMultilingual';

const LoadingImg = ({ height }: { height: string }) => {
  const m = useMultilingual('loading');
  const cloudinaryImgUrl = 'https://res.cloudinary.com/doqfofexn/image/upload/v1714393075/%EB%A1%9C%EB%94%A9%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98_sm_j46xtc.gif';

  return (
    <div className={`flex flex-col items-center justify-center h-[${height}]  bg-bgColor2`}>
      <Image src={cloudinaryImgUrl} alt="로딩이미지" width={200} height={200} />
      <div className="text-2xl font-bold text-pointColor3">{m('TEXT')}</div>
    </div>
  );
};

export default LoadingImg;
