import { Option, OptionsToInsert, Question, QuestionsToInsert, Quiz, QuizRank } from '@/types/quizzes';
import { supabase } from '@/utils/supabase/supabase';

/** quiz 썸네일을 스토리지에 upload */
export const uploadThumbnailToStorage = async (file: File, fileName: string) => {
  try {
    const { data, error } = await supabase.storage.from('quiz-thumbnails').upload(fileName, file, {
      contentType: file.type
    });
    if (error) {
      alert('썸네일 업로드 중 오류가 발생했습니다. 다시 시도하세요.');
      throw error;
    }
    return data.path;
  } catch (error) {
    console.error('퀴즈 썸네일 이미지 업로드 에러 발생', error);
    return null;
  }
};

/** question 첨부 이미지를 스토리지에 upload */
export const uploadImageToStorage = async (imgFile: File | null, fileName: string) => {
  try {
    if (!imgFile) return;
    const { data, error } = await supabase.storage.from('question-imgs').upload(fileName, imgFile, {
      contentType: imgFile.type
    });
    if (error) {
      alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도하세요.');
      throw error;
    }
    return data.path;
  } catch (error) {
    console.error('문제 이미지 업로드 에러 발생', error);
    return null;
  }
};

/** quiz를 quizzes 테이블에 insert */
export const insertQuizToTable = async (newQuiz: Quiz) => {
  try {
    const { data, error } = await supabase.from('quizzes').insert([newQuiz]).select('*');
    if (error) throw error;
    const quizId = data?.[0].id;
    return quizId;
  } catch (error) {
    console.error('게시글 등록 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};

/** questions를 questions 테이블에 insert */
export const insertQuestionsToTable = async (newQuestions: QuestionsToInsert) => {
  try {
    const { data, error } = await supabase.from('questions').insert([newQuestions]).select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('문제 등록 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};

/** options를 question_options 테이블에 insert*/
export const insertOptionsToTable = async (newOptions: OptionsToInsert[]) => {
  try {
    const insertPromises = newOptions.map(async (option) => {
      const { data, error } = await supabase.from('question_options').insert([option]).select('*');
      if (error) throw error;
      return data;
    });
    const insertResults = await Promise.all(insertPromises);
    return insertResults;
  } catch (error) {
    console.error('선택지 등록 실패', error);
    alert('객관식 선택지를 등록하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getQuizzes = async () => {
  try {
    const { data, error } = await supabase.from('quizzes').select('*');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 목록 받아오기 실패', error);
    alert('일시적으로 퀴즈 목록을 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getRecentQuizzes = async () => {
  try {
    const { data, error } = await supabase.from('quizzes').select('*').limit(4);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 목록 받아오기 실패', error);
    alert('일시적으로 퀴즈 목록을 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};


export const getQuiz = async (id: string | string[]) => {
  try {
    const { data, error } = await supabase.from('quizzes').select('*').eq('id', id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 데이터 받아오기 실패', error);
    alert('일시적으로 퀴즈 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const getQuizRank = async (): Promise<QuizRank[]> => {
  try {
    const { data, error } = await supabase.rpc('get_quiz_ranking_with_details').limit(3);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 데이터 받아오기 실패', error);
    // alert('일시적으로 퀴즈 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

export const fetchUserQuizzes = async (email : string) => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('creator_id', email);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 퀴즈 불러오기 실패', error);
  }
};