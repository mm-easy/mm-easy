import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertQuizScore } from '@/api/tries';
import type { QuizScore } from '@/types/quizzes';

export const useSubmitQuizScore = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (score: QuizScore) => {
      try {
        const result = await insertQuizScore(score);
        console.log(result);
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
