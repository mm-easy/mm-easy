'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { BlueInput } from '@/components/common/BlueInput';
import { handleMaxLength } from '@/utils/handleMaxLength';
import { generateFileName } from '@/utils/generateFileName';
import { uploadAvatarToStorage } from '@/api/users';
import { toast } from 'react-toastify';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { useUpdateProfile } from './mutations';

import type { User } from '@/types/users';

const MyProfile = ({ currentUser }: { currentUser: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(currentUser.nickname);
  const [file, setFile] = useState<File | null>(null);
  const [selectedImg, setSelectedImg] = useState(`${profileStorageUrl}/${currentUser.avatar_img_url}`);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfileMutation = useUpdateProfile();

  /** 수정 모달에서 취소하기 버튼 클릭 시 */
  const handleCancelBtn = () => {
    if (!window.confirm('프로필 수정을 취소하시겠습니까?')) return;
    setFile(null);
    setSelectedImg(`${profileStorageUrl}/${currentUser.avatar_img_url}`);
    setIsEditing(false);
  };

  /** 수정 모달에서 이미지 클릭하여 파일 첨부하기 */
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

  /** 수정 모달에서 수정완료 버튼 클릭 시 */
  const handleSubmitBtn = async () => {
    try {
      let imgUrl = currentUser.avatar_img_url;
      if (file) {
        const fileName = generateFileName(file);
        imgUrl = (await uploadAvatarToStorage(file, fileName)) as string;
      }
      if (!nickname) {
        toast.warning('닉네임을 입력해주세요.');
        return;
      }
      const newProfile = {
        nickname,
        avatar_img_url: imgUrl
      };
      await updateProfileMutation.mutateAsync({ id: currentUser.id, newProfile: newProfile });
      toast.success('프로필이 수정되었습니다.');
      setIsEditing(false);
    } catch (error) {
      toast.error('이미지 업로드 중 오류발생! 다시 시도하세요.');
    }
  };
  return (
    <main className="w-full h-full flex flex-col items-center">
      <h3 className="mt-10 text-center text-pointColor1 text-xl font-semibold">프로필</h3>
      <article className="flex gap-20 mt-5">
        <section className="w-[230px] h-[230px]">
          <Image
            src={`${profileStorageUrl}/${currentUser.avatar_img_url}`}
            alt="사용자 프로필"
            width={250}
            height={250}
            className="w-full h-full object-cover border-solid border border-pointColor1 rounded-full"
          />
        </section>
        <section className="flex flex-col justify-around">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <p className="text-pointColor1 font-semibold">닉네임</p>
              <p className="text-lg">{currentUser.nickname}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-pointColor1 font-semibold">이메일</p>
              <p className="text-lg">{currentUser.email}</p>
            </div>
          </div>
          <div
            className="text-pointColor1 underline underline-offset-4 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            프로필 수정
          </div>
        </section>
      </article>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white border-solid border-2 border-pointColor1 p-6 rounded-xl flex flex-col w-[330px]">
            <h2 className="mb-4 text-center text-xl font-bold text-pointColor1">프로필 수정</h2>
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
                  className="w-[120px] bg-gray-300 text-black font-bold tracking-wider py-2 px-4 rounded-md"
                  onClick={handleCancelBtn}
                >
                  취소하기
                </button>
                <button
                  type="submit"
                  className="w-[120px] bg-pointColor1 text-white font-bold tracking-wider py-2 px-4 rounded-md"
                >
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
