import { getExQuestion } from '@/api/questions';
import { useQuery } from '@tanstack/react-query';
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
    return <div>로딩 중..</div>;
  }

  const question = data as Question[];
  const { title } = question[0];

  return <div className="truncate">{title}</div>;
};

export default QuestionEx;
