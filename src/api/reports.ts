import { Admin } from '@/types/reports';
import { supabase } from '@/utils/supabase/supabase';

export const insertReport = async (report: Admin) => {
  try {
    const { error } = await supabase.from('reports').insert([report]).select('*');
    if (error) throw error;
  } catch (error) {
    console.log('신고 등록 실패', error);
    alert('신고를 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
