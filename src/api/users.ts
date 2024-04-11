import { supabase } from '@/utils/supabase/supabase';
import type { ProfileToUpdate, User } from '@/types/users';

export const getUsers = async () => {
  try {
    const { data: profiles, error } = await supabase.from('profiles').select('*');

    if (error) throw error;
    return profiles || [];
  } catch (error) {
    console.error('포스트를 가져오는 중 오류 발생:', error);
    return [];
  }
};

/** 아이디를 기준으로 유저 1명의 정보 가져오기 */
export const getUser = async (id: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 정보 불러오기 에러 발생', error);
    return null;
  }
};

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

/** 프로필 업데이트 */
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
