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
    <>
      {isVisible && (
        <div className="cursor-pointer origin-center rotate-[270deg]">
          <ArrowCircle width={40} height={40} onClick={handlePageUp} fill="#2B84ED" />
        </div>
      )}
    </>
  );
};

export default PageUpBtn;
