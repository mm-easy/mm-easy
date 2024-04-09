import React from 'react';
import TestImg from '@/assets/level1.png';
import Image from 'next/image';

const MyProfile = () => {
  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="mt-10 text-center text-pointColor1 text-xl font-semibold">프로필</div>
      <div className="flex gap-20 mt-10">
        <div className="w-[250px] h-[250px]">
          <Image
            src={TestImg}
            alt=""
            width={250}
            height={250}
            className="w-full h-full object-cover border-solid border border-pointColor1 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-5 justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-pointColor1 font-semibold">닉네임</p>
            <p className="text-lg">진짜닉네임</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-pointColor1 font-semibold">이메일</p>
            <p className="text-lg">cocoa@naver.com</p>
          </div>
          <div className="mt-9 text-pointColor1 underline underline-offset-4">프로필 수정</div>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
