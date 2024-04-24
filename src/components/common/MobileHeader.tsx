import React from 'react';
import Link from 'next/link';
import { IoMdArrowBack } from 'react-icons/io';

export const MobileHeader = ({ backPage, text }: { backPage: string; text: string }) => {
  return (
    <header className="sm:block hidden text-center w-full h-[8vh] leading-[7.5vh] flex items-center font-bold border-solid border-b-2 sm:text-white sm:bg-pointColor1 text-pointColor1 bg-bgColor1 border-pointColor1">
      <div className="flex w-full items-center">
        <Link href={backPage} className="flex flex-shrink-0 items-center ml-2">
          <IoMdArrowBack />
        </Link>
        <div className="flex-grow text-center">{text}</div>
      </div>
    </header>
  );
};
