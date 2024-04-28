import React from 'react';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';

export const MobileHeader = ({ backPage, text }: { backPage: string; text: string }) => {
  return (
    <header className="sm:block hidden w-full h-[8vh] leading-[7.5vh] text-xl font-bold text-white bg-pointColor1">
      <div className="flex w-full items-center">
        <Link href={backPage} className="flex absolute flex-shrink-0 ml-2">
          <IoMdArrowBack />
        </Link>
        <div className="flex-grow text-center">{text}</div>
      </div>
    </header>
  );
};
