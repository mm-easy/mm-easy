import { supabase } from '@/utils/supabase/supabase';

import type { ProfileToUpdate } from '@/types/users';

/** 프로필 이미지를 스토리지에 upload */
export const uploadAvatarToStorage = async (file: File, fileName: string) => {
  try {
    const { data, error } = await supabase.storage.from('profile_imgs').upload(fileName, file, {
      contentType: file.type
    });
    if (error) {
      alert('프로필 이미지 업로드 중 오류가 발생했습니다. 다시 시도하세요.');
      throw error;
    }
    return data.path;
  } catch (error) {
    console.error('프로필 이미지 업로드 에러 발생', error);
    return null;
  }
};

export const updateProfile = async (id: string, newProfile: ProfileToUpdate) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        nickname: newProfile.nickname,
        avatar_img_url: newProfile.avatar_img_url
      })
      .eq('id', id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('프로필 업데이트 중 에러 발생', error);
    return null;
  }
};
