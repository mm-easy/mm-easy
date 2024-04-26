import { useEffect, useState } from 'react';
import ArrowCircle from '@/assets/arrow_circle_right_FILL1_wght400_GRAD0_opsz24.svg';

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

  const buttonClass = `fixed ${smallBottom} ${bottom} sm:right-[20px] right-[25px] bg-pointColor1 rounded-full origin-center rotate-[270deg] cursor-pointer`;

  return (
    <>
      {isVisible && (
        <div className={buttonClass}>
          <ArrowCircle onClick={handlePageUp} style={{ fill: '#fff', width: '60px', height: '60px' }} />
        </div>
      )}
    </>
  );
};

export default PageUpBtn;
