import PlusCircle from '@/assets/add_FILL1_wght400_GRAD0_opsz24.svg';

interface CreateNewQuizBtnProps {
  handleMakeQuizBtn: () => void;
}

const CreateNewQuizBtn = ({ handleMakeQuizBtn }: CreateNewQuizBtnProps) => {
  return (
    <main
      className="sm:fixed sm:flex sm:justify-center sm:items-center sm:text-3xl sm:font-bold sm:bottom-28 sm:right-[20px] sm:bg-pointColor1 sm:w-[60px] sm:h-[60px] sm:rounded-full sm:text-white hidden"
      onClick={handleMakeQuizBtn}
    >
      <PlusCircle style={{ fill: '#fff', width: '40px', height: '40px' }} />
    </main>
  );
};

export default CreateNewQuizBtn;
