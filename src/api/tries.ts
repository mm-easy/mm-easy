import { supabase } from '@/utils/supabase/supabase';
import type { QuizTry, QuizTryRank } from '@/types/quizzes';

export const insertQuizTry = async (quizTry: QuizTry) => {
  try {
    const { error } = await supabase.from('quiz_tries').insert([quizTry]).select('*');
    if (error) throw error;
  } catch (error) {
    console.log('퀴즈 점수 등록 실패', error);
    alert('퀴즈 점수를 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const updateQuizScore = async (quizTry: QuizTry) => {
  try {
    const { user_id, quiz_id, score } = quizTry;
    const { error } = await supabase.from('quiz_tries').update({ score }).eq('user_id', user_id).eq('quiz_id', quiz_id);
    if (error) throw error;
  } catch (error) {
    console.log('퀴즈 점수 업데이트 실패', error);
    alert('퀴즈 점수를 업데이트하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getMyQuizScore = async (id: string) => {
  try {
    const { data, error } = await supabase.from('quiz_tries').select('score').eq('user_id', id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('내가 푼 퀴즈 데이터 받아오기 실패', error);
    alert('일시적으로 내가 푼 퀴즈 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

/** tries 테이블에서 상위점수 3명 target_date기준 일주일단위로 가져오기 */
export const getTopQuizScores = async (): Promise<QuizTryRank[]> => {
  try {
    const { data: quizScores, error } = await supabase.rpc('get_quiz_tries_with_details', { target_date: '2024-04-15' }).limit(3);
    if (error) throw error;
    return quizScores;
  } catch (error) {
    console.log('퀴즈 점수 가져오기 실패:', error);
    alert('퀴즈 점수를 가져오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
