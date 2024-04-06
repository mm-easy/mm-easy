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
  return (
    <div className="w-full relative">
      <input
        type="text"
        className="w-full pl-4 py-2 border-solid border border-pointColor1 rounded-md"
        placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
        onInput={(e) => onInput(e, 30)}
        onChange={(e) => {
          onChange(id, e.target.value);
        }}
      />
      <p className="absolute top-0 right-2 py-2 pr-2">{value.length}/30</p>
    </div>
  );
};

export default InputQuestionTitle;
