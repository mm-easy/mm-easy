import { Dispatch, SetStateAction, useState } from 'react';
import { FaHighlighter } from 'react-icons/fa';

const CorrectAnswerBtn = ({ answer }: { answer: string | undefined }) => {
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleShowCorrectAnswer = () => {
    setShowCorrectAnswer(!showCorrectAnswer);
  };

  return (
    <section className="h-5 flex justify-end gap-2 leading-5 text-pointColor1">
      {showCorrectAnswer && <p>{answer}</p>}
      <button onClick={handleShowCorrectAnswer}>
        <FaHighlighter className="text-pointColor1 text-lg" />
      </button>
    </section>
  );
};

export default CorrectAnswerBtn;
