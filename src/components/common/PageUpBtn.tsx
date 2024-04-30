import { useEffect, useState } from 'react';
import Arrow from '@/assets/pageup_btn.png';
import Image from 'next/image';

interface PageUpBtnProps {
  scrollPosition: number;
  bottom: string;
  smallBottom: string;
}

const PageUpBtn = ({ scrollPosition, bottom, smallBottom }: PageUpBtnProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handlePageUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const showButton = () => {
      if (scrollPosition > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', showButton);
    return () => {
      window.removeEventListener('scroll', showButton);
    };
  }, [scrollPosition]);

  const buttonClass = `fixed ${smallBottom} ${bottom} sm:right-[20px] right-[25px] bg-pointColor1 rounded-full`;

  return (
    <>
      {isVisible && (
        <button className={buttonClass} onClick={handlePageUp}>
          <Image src={Arrow} width={60} height={60} alt="페이지업 버튼 이미지" />
        </button>
      )}
    </>
  );
};

export default PageUpBtn;
