import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertReport } from '@/api/reports';
import { insertQuizTry, updateQuizScore } from '@/api/tries';
import type { QuizTry } from '@/types/quizzes';
import type { Admin } from '@/types/reports';

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

export const useSubmitReport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (report: Admin) => {
      try {
        const result = await insertReport(report);
        return report;
      } catch (error) {
        console.log('신고 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    }
  });
};
