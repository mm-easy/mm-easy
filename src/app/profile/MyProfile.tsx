'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { BlueInput } from '@/components/common/BlueInput';
import { handleMaxLength } from '@/utils/handleMaxLength';
import { generateFileName } from '@/utils/generateFileName';
import { updateProfile, uploadAvatarToStorage } from '@/api/users';
import { toast } from 'react-toastify';

import type { User } from '@/types/users';
import { profileStorageUrl } from '@/utils/supabase/storage';

const MyProfile = ({ currentUser }: { currentUser: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [file, setFile] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState(`${profileStorageUrl}/${currentUser.avatar_img_url}`);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCancelBtn = () => {
    if (!window.confirm('프로필 수정을 취소하시겠습니까?')) return;
    setFile(null);
    setSelectedImg(currentUser.avatar_img_url);
    setIsEditing(false);
  };

  const handleClickImg = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitBtn = async () => {
    try {
      let imgUrl = selectedImg;
      if (file) {
        const fileName = generateFileName(file);
        imgUrl = (await uploadAvatarToStorage(file, fileName)) as string;
      }
      const newProfile = {
        nickname,
        avatar_img_url: imgUrl
      };

      await updateProfile(currentUser.id, newProfile);
    } catch (error) {
      toast.error('이미지 업로드 중 오류발생! 다시 시도하세요.');
    }
  };
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
            <form
              className="flex flex-col gap-5 justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitBtn();
              }}
            >
              <div className="flex justify-center items-center w-[200px] h-[200px]">
                <Image
                  src={selectedImg}
                  alt="사용자 프로필"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover cursor-pointer border-solid border border-pointColor1 rounded-full"
                  onClick={handleClickImg}
                />
                <input type="file" id="fileInput" ref={fileInputRef} className="hidden" onChange={handleChangeImg} />
              </div>
              <div>
                <BlueInput
                  value={nickname}
                  width="w-[250px]"
                  maxNum={10}
                  onInput={(e) => handleMaxLength(e, 10)}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              <div className="flex w-full justify-center gap-2">
                <button
                  type="button"
                  className="w-[120px] bg-gray-300 text-black font-bold py-2 px-4 rounded"
                  onClick={handleCancelBtn}
                >
                  취소하기
                </button>
                <button type="submit" className="w-[120px] bg-pointColor1 text-white font-bold py-2 px-4 rounded">
                  수정완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyProfile;
