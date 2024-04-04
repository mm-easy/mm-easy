const InputQuestionTitle = ({
  id,
  onChange
}: {
  id: string | undefined;
  onChange: (id: string | undefined, title: string) => void;
}) => {
  return (
    <input
      type="text"
      className="w-full px-4 py-2 border-solid border border-pointColor1 rounded-md"
      placeholder="문제를 입력해 주세요. ex)Apple의 한국어 뜻으로 알맞은 것은?"
      onChange={(e) => {
        onChange(id, e.target.value);
      }}
    />
  );
};

export default InputQuestionTitle;
