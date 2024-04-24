interface CreateNewQuizBtnProps {
  handleMakeQuizBtn: () => void;
}

const CreateNewQuizBtn = ({ handleMakeQuizBtn }: CreateNewQuizBtnProps) => {
  return (
    <main
      className="sm:fixed sm:flex sm:justify-center sm:items-center sm:text-3xl sm:font-bold sm:bottom-[80px] sm:right-[20px] sm:bg-pointColor1 sm:w-[60px] sm:h-[60px] sm:rounded-full sm:text-white hidden"
      onClick={handleMakeQuizBtn}
    >
      +
    </main>
  );
};

export default CreateNewQuizBtn;
