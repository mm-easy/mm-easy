import { supabase } from '@/utils/supabase/supabase';

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
