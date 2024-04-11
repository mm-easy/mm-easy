import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertQuizTry, updateQuizScore } from '@/api/tries';
import type { QuizTry } from '@/types/quizzes';

export const useSubmitQuizTry = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (quizTry: QuizTry) => {
      try {
        const result = await insertQuizTry(quizTry);
        return result;
      } catch (error) {
        console.log('퀴즈 점수 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz_tries'] });
    }
  });

  return mutation;
};

export const useUpdateQuizTry = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (quizTry: QuizTry) => {
      try {
        const { user_id, quiz_id, score } = quizTry;
        const result = await updateQuizScore(user_id, quiz_id, score);
        return result;
      } catch (error) {
        console.log('퀴즈 점수 업데이트 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz_tries'] });
    }
  });

  return mutation;
};
