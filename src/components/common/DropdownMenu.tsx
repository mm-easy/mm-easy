import { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

export const DropdownMenu = ({ editBtn, deleteBtn }: { editBtn: React.ReactNode; deleteBtn: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userMenuOnBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="relative sm:block hidden">
      <button onClick={() => setIsOpen(!isOpen)} onBlur={userMenuOnBlur} className="mr-2 focus:outline-none">
        <HiDotsVertical />
      </button>
      {isOpen && (
        <div className="absolute flex flex-col right-0 mt-2 w-32 border-solid border border-pointColor1 bg-white rounded-md z-20">
          {editBtn}
          <hr className="border-t-1 border-solid border-pointColor1" />
          {deleteBtn}
        </div>
      )}
    </div>
  );
};
