import Image from 'next/image';

const MainLogo = () => {
  return (
    <>
      <header className="w-full h-400 relative">
        <Image
          src={'https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/main-image/mainimage.jpeg'}
          alt="메인 로고"
          width={1920}
          height={400}
          className="object-cover"
          unoptimized
        />
      </header>
    </>
  );
};

export default MainLogo;
