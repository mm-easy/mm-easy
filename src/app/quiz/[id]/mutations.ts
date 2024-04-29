import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertQuizTry, updateQuizScore } from '@/api/tries';
import { deleteQuiz } from '@/api/quizzes';
import { toast } from 'react-toastify';

import type { QuizTry } from '@/types/quizzes';
import { Report } from '@/types/reports';
import { insertReport } from '@/api/reports';
import { useRouter } from 'next/navigation';

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
    mutationFn: async (report: Report) => {
      try {
        const result = await insertReport(report);
        return result;
      } catch (error) {
        console.log('신고 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    }
  });

  return mutation;
};

/** quizzes 테이블에서 id에 해당하는 퀴즈 삭제 */
export const useDeleteQuiz = () => {
  const router = useRouter();
  const deleteQuizMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteQuiz(id);
        router.replace('/quiz/list');
      } catch (error) {
        console.error('퀴즈 삭제 실패', error);
        throw error;
      }
    }
  });

  return deleteQuizMutation;
};
