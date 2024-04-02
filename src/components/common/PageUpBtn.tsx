'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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
        <Image src="https://via.placeholder.com/30x30" alt="" width={30} height={30} onClick={handlePageUp} />
      )}
    </>
  );
};

export default PageUpBtn;
