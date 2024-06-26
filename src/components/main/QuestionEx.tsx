import { useQuery } from '@tanstack/react-query';
import { getExQuestion } from '@/api/questions';

import type { Question } from '@/types/quizzes';

const QuestionEx = ({ id }: { id: string | undefined }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      try {
        const data = await getExQuestion(id);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['questions', id]
  });

  if (isLoading) {
    return <p className="h-[16px] text-pointColor1 font-bold">로딩 중 입니다.</p>;
  }

  const question = data as Question[];
  if (question.length === 0) {
    return null;
  }
  const { title } = question[0];

  if (title.length === 0) {
    return null;
  }

  return <div className="truncate">{title}</div>;
};

export default QuestionEx;
