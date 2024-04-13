import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertAdmin } from '@/api/admin';
import { insertQuizTry, updateQuizScore } from '@/api/tries';
import type { QuizTry } from '@/types/quizzes';
import type { Admin } from '@/types/admin';

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
        const result = await updateQuizScore(quizTry);
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

export const useSubmitAdmin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (admin: Admin) => {
      try {
        const result = await insertAdmin(admin);
        return result;
      } catch (error) {
        console.log('관리 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
    }
  });

  return mutation;
};
