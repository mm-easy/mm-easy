import { Quiz } from '@/types/quizzes';
import { supabase } from '@/utils/supabase/supabase';

export const uploadThumbnailToStorage = async (file: File, fileName: string) => {
  try {
    const { data, error } = await supabase.storage.from('quiz-thumbnails').upload(fileName, file, {
      contentType: file.type
    });
    if (error) {
      alert(`일시적인 오류가 발생했습니다. 다시 시도하세요.`);
      throw error;
    }
    return data.path;
  } catch (error) {
    alert(`일시적인 오류가 발생했습니다. 다시 시도하세요.`);
    return null;
  }
};

export const insertQuizToTable = async (newQuiz: Quiz) => {
  try {
    const { data, error } = await supabase.from('quizzes').insert([newQuiz]);
    if (error) {
      throw error;
    }
    if (data) {
      console.log('등록된 게시글', data);
      alert('퀴즈가 성공적으로 등록되었습니다.');
    }
  } catch (error) {
    console.error('게시글 등록 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};
