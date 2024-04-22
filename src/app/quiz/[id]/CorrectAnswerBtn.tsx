import { Dispatch, SetStateAction } from 'react';
import { FaHighlighter } from 'react-icons/fa';

const CorrectAnswerBtn = ({
  showCorrectAnswer,
  setShowCorrectAnswer
}: {
  showCorrectAnswer: boolean;
  setShowCorrectAnswer: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleShowCorrectAnswer = () => {
    setShowCorrectAnswer(!showCorrectAnswer);
  };

  return (
    <button onClick={handleShowCorrectAnswer}>
      <FaHighlighter className="text-pointColor1 text-lg" />
    </button>
  );
};

export default CorrectAnswerBtn;
