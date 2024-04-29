import { useQuery } from '@tanstack/react-query';
import { getOptions } from '@/api/question_options';
import { Dispatch, SetStateAction } from 'react';
import type { Answer, Option } from '@/types/quizzes';
import CorrectAnswerBtn from './CorrectAnswerBtn';

const Options = ({
  id: questionId,
  resultMode,
  usersAnswer,
  onChange,
  onKeyDown
}: {
  id: string | undefined;
  resultMode: boolean;
  usersAnswer: Answer | undefined;
  onChange: (id: string | undefined, answer: string | boolean, option_id?: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      try {
        const data = await getOptions(questionId);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['question_options', questionId]
  });

  if (isLoading) return <div>옵션 로드 중..</div>;
  if (isError) return <div>옵션 로드 에러..</div>;

  const options = data as Option[];

  const correctAnswer = options.find((option) => option.is_answer === true)?.content;

  return (
    <section className="w-full flex flex-col gap-4">
      {options.map((option) => {
        const { id, content, is_answer } = option;
        return (
          <label
            key={id}
            className={`sm:h-12 sm:leading-7 pl-4 py-[9px] flex gap-4 border-solid border ${
              resultMode && usersAnswer?.option_id === id
                ? is_answer
                  ? 'border-pointColor1 bg-bgColor2'
                  : 'border-pointColor2 bg-bgColor3'
                : 'border-pointColor1'
            } rounded-md`}
          >
            <input
              type="radio"
              disabled={resultMode}
              name={questionId}
              checked={usersAnswer?.option_id === id}
              onChange={() => onChange(questionId, is_answer, id)}
              onKeyDown={onKeyDown}
            />
            {content}
          </label>
        );
      })}
      {resultMode && <CorrectAnswerBtn answer={correctAnswer} />}
    </section>
  );
};

export default Options;
