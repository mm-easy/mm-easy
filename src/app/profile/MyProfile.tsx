import Image from 'next/image';

import type { User } from '@/types/users';

const MyProfile = ({ currentUser }: { currentUser: User }) => {
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
          <div className="mt-7 text-pointColor1 underline underline-offset-4">프로필 수정</div>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
