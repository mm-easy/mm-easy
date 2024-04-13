import { Admin, Report } from '@/types/admin';
import { supabase } from '@/utils/supabase/supabase';

export const insertAdmin = async (admin: Admin) => {
  try {
    const { data, error } = await supabase.from('admin').insert([admin]).select('*');
    if (error) throw error;
    const adminId = data[0].id;
    return adminId;
  } catch (error) {
    console.log('관리 등록 실패', error);
    alert('관리 대상에 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

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
