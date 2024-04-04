import { Option, Question, Quiz } from '@/types/quizzes';
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
    const { data, error } = await supabase.from('quizzes').insert([newQuiz]).select('*');
    if (error) {
      throw error;
    }
    const quizId = data?.[0].id;
    console.log('등록완료', quizId);
    return quizId;
  } catch (error) {
    console.error('게시글 등록 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};

export const insertQuestionsToTable = async (newQuestions: Question[]) => {
  try {
    const insertPromises = newQuestions.map(async (question) => {
      const { data, error } = await supabase.from('questions').insert([question]).select('*');
      if (error) {
        throw error;
      }
      return data;
    });
    const insertResults = await Promise.all(insertPromises);
    return insertResults;
  } catch (error) {
    console.error('문제 등록 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};

export const insertOptionsToTable = async (newOptions: Option[]) => {
  try {
    const insertPromises = newOptions.map(async (option) => {
      const { data, error } = await supabase.from('question_options').insert([option]).select('*');
      if (error) {
        throw error;
      }
      return data;
    });
    const insertResults = await Promise.all(insertPromises);
    return insertResults;
  } catch (error) {
    console.error('선택지 등록 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};
