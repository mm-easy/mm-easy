import { QuestionType } from '@/types/quizzes';
import { ReactNode } from 'react';

const SelectQuestionType = ({
  id,
  defaultChecked,
  onChange,
  type,
  title
}: {
  id: string | undefined;
  defaultChecked: boolean;
  onChange: (id: string | undefined, type: QuestionType) => void;
  type: QuestionType;
  title: string;
}) => {
  return (
    <label className="pr-4">
      <input
        type="radio"
        name={id}
        defaultChecked={defaultChecked}
        className="mr-2"
        onChange={() => onChange(id, type)}
      />
      {title}
    </label>
  );
};

export default SelectQuestionType;
