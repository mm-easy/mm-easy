import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import type { Question, Quiz } from '@/types/quizzes';
import { insertQuestionsToTable, insertQuizToTable } from '@/api/quizzes';

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  const insertQuizMutation = useMutation({
    mutationFn: async ({ newQuiz, newQuestions }: { newQuiz: Quiz; newQuestions: Question[] }) => {
      try {
        const result = await insertQuizToTable(newQuiz);
        console.log('의의', result);
      } catch (error) {
        console.error('퀴즈 등록 실패', error);
        throw error;
      }

      try {
        const result = await insertQuestionsToTable(newQuestions);
        console.log('의의', result);
      } catch (error) {
        console.error('퀴즈 등록 실패', error);
        throw error;
      }

      // try {
      //   const result = await insertQuizToTable(newQuiz);
      //   console.log('의의', result);
      // } catch (error) {
      //   console.error('퀴즈 등록 실패', error);
      //   throw error;
      // }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      toast.success('퀴즈가 등록되었습니다.');
      // router.replace('/quiz-list');
    }
  });

  return insertQuizMutation;
};

export default useSubmitQuiz;
