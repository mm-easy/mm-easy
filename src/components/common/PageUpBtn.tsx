'use client';

import { useEffect, useState } from 'react';
import ArrowCircle from '@/assets/arrow_circle_right_FILL1_wght400_GRAD0_opsz24.svg';

interface PageUpBtnProps {
  scrollPosition: number;
}
const PageUpBtn = ({ scrollPosition }: PageUpBtnProps) => {
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

  return (
    // <div
    //   className={`fixed bottom-[40px] right-[150px] bg-pointColor1 rounded-full origin-center rotate-[270deg] cursor-pointer transition-transform ${
    //     isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
    //   }`}
    // >
    <main>
      {isVisible && (
        <div className="fixed sm:w-[60px] sm:h-[60px] sm:bottom-[150px] bottom-[80px] sm:right-[20px] right-[25px] bg-pointColor1 rounded-full origin-center rotate-[270deg] cursor-pointer">
          <ArrowCircle width={60} height={60} onClick={handlePageUp} fill="#fff" />
        </div>
      )}
    </main>
  );
};

export default PageUpBtn;
