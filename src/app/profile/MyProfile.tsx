'use client';

import Image from 'next/image';

import type { User } from '@/types/users';
import { useState } from 'react';
import { BlueInput } from '@/components/common/BlueInput';

const MyProfile = ({ currentUser }: { currentUser: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('');

  return (
    <main className="w-full h-full flex flex-col items-center">
      <div className="mt-10 text-center text-pointColor1 text-xl font-semibold">프로필</div>
      <div className="flex gap-20 mt-5">
        <div className="w-[230px] h-[230px]">
          <Image
            src={currentUser.avatar_img_url}
            alt="사용자 프로필"
            width={250}
            height={250}
            className="w-full h-full object-cover border-solid border border-pointColor1 rounded-full"
          />
        </div>
        <div className="flex flex-col p-4 justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-pointColor1 font-semibold">닉네임</p>
            <p className="text-lg">{currentUser.nickname}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-pointColor1 font-semibold">이메일</p>
            <p className="text-lg">{currentUser.email}</p>
          </div>
          <div
            className="mt-7 text-pointColor1 underline underline-offset-4 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            프로필 수정
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white border-solid border-2 border-pointColor1 p-6 rounded-md flex flex-col w-[330px]">
            <h2 className="font-bold text-xl mb-4">프로필 수정</h2>
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="flex justify-center items-center w-[200px] h-[200px]">
                <Image
                  src={currentUser.avatar_img_url}
                  alt="사용자 프로필"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover border-solid border border-pointColor1 rounded-full"
                />
              </div>
              <div>
                <BlueInput value={nickname} width="w-[230px]" maxNum={10} />
              </div>
              <div className="flex w-full justify-center gap-2">
                <button className="w-[110px] bg-gray-300 text-black font-bold py-2 px-4 rounded">취소하기</button>
                <button className="w-[110px] bg-pointColor1 text-white font-bold py-2 px-4 rounded">수정완료</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyProfile;
