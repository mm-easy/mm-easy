import { QuestionType } from '@/types/quizzes';

const SelectQuestionType = ({
  id,
  currentType,
  defaultChecked,
  onChange,
  type,
  title
}: {
  id: string | undefined;
  currentType: QuestionType;
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
        checked={currentType === type}
        defaultChecked={defaultChecked}
        className="mr-2"
        onChange={() => onChange(id, type)}
      />
      {title}
    </label>
  );
};

export default SelectQuestionType;
