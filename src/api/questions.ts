import { supabase } from '@/utils/supabase/supabase';

export const getQuestions = async (id: string | string[]) => {
  try {
    const { data, error } = await supabase.from('questions').select('*').eq('quiz_id', id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀘스천 데이터 받아오기 실패', error);
    alert('일시적으로 퀘스천 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getExQuestion = async (id:string| undefined) => {
  try {
    const { data, error } = await supabase.from('questions').select('*').eq('quiz_id',id).limit(1);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('예시 퀘스천 받아오기 실패', error);
    alert('일시적으로 예시 퀘스천 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
