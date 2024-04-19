import { supabase } from '@/utils/supabase/supabase';
import type { ReportTest } from '@/types/reports';

export const insertTest = async (report: ReportTest) => {
  try {
    const { error } = await supabase.from('test').insert([report]).select('*');
    if (error) throw error;
  } catch (error) {
    console.log('신고 등록 실패', error);
    alert('신고에 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
