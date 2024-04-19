import { ReportTest } from '@/types/reports';
import { supabase } from '@/utils/supabase/supabase';

export const getQuizzesReports = async (): Promise<ReportTest[]> => {
  try {
    const { data, error } = await supabase.from('test').select('*').eq('type', 'quiz');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('신고 데이터 받아오기 실패', error);
    alert('일시적으로 신고 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getPostsReports = async (): Promise<ReportTest[]> => {
  try {
    const { data, error } = await supabase.from('test').select('*').eq('type', 'post');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('신고 데이터 받아오기 실패', error);
    alert('일시적으로 신고 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
