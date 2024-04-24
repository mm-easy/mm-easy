import Image from 'next/image';
import { useState } from 'react';

const Banner = () => {
  const banners = ['banner_v2_b.png', 'banner_v2_lb.png'];
  const [randomIdx] = useState(Math.floor(Math.random() * banners.length));

  return (
    <main className="w-full border-solid border-b-2 border-pointColor1 sm:hidden">
      <Image
        src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/${banners[randomIdx]}`}
        alt="로고"
        width={1920}
        height={600}
        quality={100}
      />
    </main>
  );
};

export default Banner;
