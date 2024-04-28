import useMultilingual from '@/utils/useMultilingual';
import { FormEvent } from 'react';

const InputQuestionTitle = ({
  id,
  value,
  onInput,
  onChange
}: {
  id: string | undefined;
  value: string;
  onInput: (e: FormEvent<HTMLInputElement>, maxLength: number) => void;
  onChange: (id: string | undefined, title: string) => void;
}) => {
  const m = useMultilingual('quizEditor');

  return (
    <div className="w-full relative">
      <input
        type="text"
        className="w-full h-11 pl-4 sm:h-12 sm:pr-16  py-2 text-blackColor border-solid border border-pointColor1 rounded-md"
        placeholder={m('QUESTION_TITLE_EXAMPLE')}
        value={value}
        onInput={(e) => onInput(e, 30)}
        onChange={(e) => {
          onChange(id, e.target.value);
        }}
      />
      <p className="absolute sm:top-1 top-0 right-2 pt-3 pr-1 text-sm">{value.length} / 30</p>
    </div>
  );
};

export default InputQuestionTitle;
