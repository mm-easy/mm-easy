import { Dispatch, SetStateAction } from 'react';

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

  return <button onClick={handleShowCorrectAnswer}>💡</button>;
};

export default CorrectAnswerBtn;
