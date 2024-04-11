import { supabase } from '@/utils/supabase/supabase';

export const getProfile = async (id: string) => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('email', id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('프로필 데이터 받아오기 실패', error);
    alert('일시적으로 프로필 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
