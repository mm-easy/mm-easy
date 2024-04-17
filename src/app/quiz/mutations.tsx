import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  UpdateQuiz,
  insertOptionsToTable,
  insertQuestionsToTable,
  insertQuizToTable,
  updateOption,
  updateQuestion
} from '@/api/quizzes';

import type { Option, OptionsToInsert, QuestionsToInsert, Quiz } from '@/types/quizzes';

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
      toast.success('퀴즈가 등록되었습니다.');
    }
  });

  return insertOptionsMutation;
};

/** quizzes 테이블에서 해당 id의 quiz를 update */
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  const updateQuizMutation = useMutation({
    mutationFn: async ({ id, updatedQuiz }: { id: string | null; updatedQuiz: Quiz }) => {
      try {
        if (!id) {
          throw new Error('퀴즈 id가 유효하지 않습니다.');
        }
        const result = await UpdateQuiz(id, updatedQuiz);
        return result;
      } catch (error) {
        console.error('퀴즈 업데이트 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    }
  });

  return updateQuizMutation;
};

/** questions 테이블에서 id에 해당하는 question을 update */
export const useUpdateQuestions = () => {
  const queryClient = useQueryClient();

  const updateQuestionsMutation = useMutation({
    mutationFn: async ({ id, updatedQuestion }: { id: string; updatedQuestion: QuestionsToInsert }) => {
      try {
        const result = await updateQuestion(id, updatedQuestion);
        const questionId = result[0]?.id;
        return questionId;
      } catch (error) {
        console.error('문제들 수정 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    }
  });

  return updateQuestionsMutation;
};

/** question_options 테이블에서 id에 해당하는 option을 update */
export const useUpdateOptions = () => {
  const queryClient = useQueryClient();

  const updateOptionsMutation = useMutation({
    mutationFn: async (updatedOptions: Option[]) => {
      try {
        const result = await updateOption(updatedOptions);
        const optionIds = result.map((result) => result[0]?.id);
        return optionIds;
      } catch (error) {
        console.error('객관식 선택지 수정 실패', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['options'] });
      toast.success('퀴즈가 수정되었습니다.');
    }
  });

  return updateOptionsMutation;
};
