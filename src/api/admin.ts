import { Admin, Report } from '@/types/admin';
import { supabase } from '@/utils/supabase/supabase';

export const getQuizzesReports = async (): Promise<Admin[]> => {
  try {
    const { data, error } = await supabase.from('admin').select('*').eq('type', 'quizzes');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('신고 데이터 받아오기 실패', error);
    alert('일시적으로 신고 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getPostsReports = async (): Promise<Admin[]> => {
  try {
    const { data, error } = await supabase.from('admin').select('*').eq('type', 'posts');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('신고 데이터 받아오기 실패', error);
    alert('일시적으로 신고 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
