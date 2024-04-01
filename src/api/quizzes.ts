import { Quiz } from '@/types/quizzes';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const uploadThumbnailToStorage = async (blob: File, fileName: string) => {
  try {
    const mimeType = blob.type;
    const { data, error } = await supabase.storage.from('quiz-thumbnails').upload(fileName, blob, {
      cacheControl: '3600',
      upsert: false,
      contentType: mimeType
    });
    if (error) {
      alert(`일시적인 오류가 발생했습니다. 다시 시도하세요.`);
      return { error };
    }
    return data.path;
  } catch (error) {
    alert(`일시적인 오류가 발생했습니다. 다시 시도하세요.`);
    return { error };
  }
};

export const insertQuizToTable = async (newQuiz: Quiz) => {
  try {
    const { data, error } = await supabase.from('quizzes').insert([newQuiz]);
    if (error) {
      throw error;
    }
    console.log('등록된 게시글', data);
    alert('퀴즈가 성공적으로 등록되었습니다.');
  } catch (error) {
    console.error('게시글 등록 실패', error);
    alert('일시적인 오류 발생');
  }
};
