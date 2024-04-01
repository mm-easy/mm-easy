'use client';

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
      if (scrollPosition > 400) {
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
        <img src="https://cdn-icons-png.flaticon.com/512/892/892692.png" width={30} onClick={handlePageUp} />
      )}
    </>
  );
};

export default PageUpBtn;
