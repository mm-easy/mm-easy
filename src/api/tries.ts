import { supabase } from '@/utils/supabase/supabase';
import type { QuizScore } from '@/types/quizzes';

export const insertQuizScore = async (score: QuizScore) => {
  try {
    const { data, error } = await supabase.from('quiz_tries').insert([score]).select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.log('퀴즈 점수 등록 실패', error);
    alert('퀴즈 점수를 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
