import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

export const QuizDropdown = ({ editBtn, deleteBtn }: { editBtn: React.ReactNode; deleteBtn: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userMenuOnBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };
  return (
    <div className="relative ">
      <button onClick={() => setIsOpen(!isOpen)} onBlur={userMenuOnBlur} className="focus:outline-none text-pointColor1">
        <HiDotsVertical />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 ">
          {editBtn}
          <hr className="border-t-1 border-solid border-pointColor1" />
          {deleteBtn}
        </div>
      )}
    </div>
  );
};
