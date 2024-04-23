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

/** quizzes 테이블에서 전체 데이터 가져오기 */
export const getQuizzes = async () => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 목록 받아오기 실패', error);
    alert('일시적으로 퀴즈 목록을 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

/** quizzes 테이블에서 페이지 나뉜 전체 데이터 가져오기 */
const PAGE_SIZE = 8;
export const getQuizzesPaged = async (pageParam: number, level: number | null) => {
  try {
    let query = supabase.from('quizzes').select('*').is('deleted_at', null).order('created_at', { ascending: false });

    if (level !== null) {
      query = query.eq('level', level);
    }

    const { data, error } = await query.range((pageParam - 1) * PAGE_SIZE, pageParam * PAGE_SIZE - 1);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 목록 받아오기 실패', error);
    alert('일시적으로 퀴즈 목록을 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

/** quizzes 테이블에서 해당 퀴즈 삭제하기 */
export const deleteQuiz = async (id: string) => {
  try {
    const { error } = await supabase.from('quizzes').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('퀴즈 삭제 중 에러 발생', error);
  }
};

/** quizzes 테이블에서 최근 4개 퀴즈 가져오기 */
export const getRecentQuizzes = async () => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(4);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 목록 받아오기 실패', error);
    alert('일시적으로 퀴즈 목록을 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

/** id에 해당하는 퀴즈 1개 가져오기 */
export const getQuiz = async (id: string) => {
  try {
    const { data, error } = await supabase.from('quizzes').select('*').eq('id', id);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('퀴즈 데이터 받아오기 실패', error);
    alert('일시적으로 퀴즈 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

/** quizzes 테이블에서 target_date기준으로 일주일동안 가장많이 퀴즈를 만든 3명 가져오기 */
export const getQuizRank = async (): Promise<QuizRank[]> => {
  const targetDate = new Date('2024-04-18').toISOString().slice(0, 10); // 날짜를 YYYY-MM-DD 형식으로 변환

  try {
    const { data, error } = await supabase.rpc('get_quiz_ranking_with_details', { target_date: targetDate }).limit(3);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('퀴즈 데이터 받아오기 실패', error);
    // alert('일시적으로 퀴즈 데이터를 받아오지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};

// export const getQuizCount = async () => {
//   const { count, error } = await supabase.from('quizzes').select('*', { count: 'exact' });
//   if (error) throw error;
//   return count;
// };

export const fetchUserQuizzes = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select(
        `
        *,
        quiz_tries:quiz_tries!public_quiz_tries_quiz_id_fkey(id)
      `
      )
      .eq('creator_id', email)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 퀴즈 불러오기 실패', error);
  }
};

export const userSolvedQuizzes = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('quiz_tries')
      .select(`*,quizzes:quiz_id (id, title)`)
      .eq('user_id', email)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('사용자 퀴즈 불러오기 실패', error);
  }
};

/** quizzes 테이블에서 id에 해당하는 퀴즈를 update */
export const UpdateQuiz = async (id: string, updatedQuiz: Quiz) => {
  try {
    const { data, error } = await supabase.from('quizzes').update(updatedQuiz).eq('id', id).select('*');
    if (error) throw error;
    const quizId = data?.[0].id;
    return quizId;
  } catch (error) {
    console.error('퀴즈 업데이트 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};

/** questions 테이블에서 id에 해당하는 question을 update */
export const updateQuestion = async (id: string, updatedQuestion: QuestionsToInsert) => {
  try {
    const { data, error } = await supabase.from('questions').update(updatedQuestion).eq('id', id).single();
    if (error) throw error;
    console.log('꺄잉', data);
    return data;
  } catch (error) {
    console.error('문제 수정 실패', error);
    alert('일시적인 오류 발생');
    throw error;
  }
};

/** question_options 테이블에서 id에 해당하는 option을 update*/
export const updateOption = async (updatedOptions: Option[]) => {
  try {
    const updatePromises = updatedOptions.map(async (option) => {
      const { id, content, is_answer } = option;
      const { data, error } = await supabase
        .from('question_options')
        .update({ content, is_answer })
        .eq('id', id)
        .select('*');
      if (error) throw error;
      return data;
    });
    const updateResults = await Promise.all(updatePromises);
    return updateResults;
  } catch (error) {
    console.error('선택지 수정 실패', error);
    alert('객관식 선택지를 수정하지 못했습니다. 다시 시도하세요.');
    throw error;
  }
};
