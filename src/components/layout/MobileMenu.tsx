'use client';

import { useEffect, useState } from 'react';

const MobileMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPost] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollPos < currentScrollPos;

      setIsMenuVisible(!isScrolledDown);
      setPrevScrollPost(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav className="hidden sm:block">
      <ul
        className={`w-full h-[8vh] bottom-0 fixed z-10 bg-bgColor1 transition-opacity duration-300 ${isMenuVisible ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        <li></li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
