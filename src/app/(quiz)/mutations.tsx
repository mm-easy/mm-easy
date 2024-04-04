import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import type { OptionsToInsert, Question, QuestionsToInsert, Quiz } from '@/types/quizzes';
import { insertOptionsToTable, insertQuestionsToTable, insertQuizToTable } from '@/api/quizzes';

/** quiz를 quizzes 테이블에 insert */
export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  const insertQuizMutation = useMutation({
    mutationFn: async (newQuiz: Quiz) => {
      try {
        const result = await insertQuizToTable(newQuiz);
        return result;
      } catch (error) {
        console.error('퀴즈 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      toast.success('퀴즈가 등록되었습니다.');
      // router.replace('/quiz-list');
    }
  });

  return insertQuizMutation;
};

/** questions를 questions 테이블에 insert */
export const useSubmitQuestions = () => {
  const queryClient = useQueryClient();

  const insertQuestionsMutation = useMutation({
    mutationFn: async (newQuestions: QuestionsToInsert) => {
      try {
        const result = await insertQuestionsToTable(newQuestions);
        const questionId = result[0]?.id;
        return questionId;
      } catch (error) {
        console.error('문제들 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    }
  });

  return insertQuestionsMutation;
};

/** options를 question_options 테이블에 insert */
export const useSubmitOptions = () => {
  const queryClient = useQueryClient();

  const insertOptionsMutation = useMutation({
    mutationFn: async (newOptions: OptionsToInsert[]) => {
      try {
        const result = await insertOptionsToTable(newOptions);
        const optionIds = result.map((result) => result[0]?.id);
        return optionIds;
      } catch (error) {
        console.error('객관식 선택지 등록 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['options'] });
    }
  });

  return insertOptionsMutation;
};
