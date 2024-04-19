import { supabase } from '@/utils/supabase/supabase';
import type { Report } from '@/types/reports';

export const insertReport = async (report: Report) => {
  try {
    const { error } = await supabase.from('reports').insert([report]).select('*');
    if (error) throw error;
  } catch (error) {
    console.log('신고 등록 실패', error);
    alert('신고에 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getQuizzesReports = async (): Promise<Report[]> => {
  try {
    const { data, error } = await supabase.from('reports').select('*').eq('type', 'quiz');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('신고 데이터 받아오기 실패', error);
    alert('일시적으로 신고 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getPostsReports = async (): Promise<Report[]> => {
  try {
    const { data, error } = await supabase.from('reports').select('*').eq('type', 'post');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('신고 데이터 받아오기 실패', error);
    alert('일시적으로 신고 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
