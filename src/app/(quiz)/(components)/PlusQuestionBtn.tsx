interface PlusQuestionBtnProps {
  onClick: () => void;
}

const PlusQuestionBtn: React.FC<PlusQuestionBtnProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="mb-9 rounded-md w-[570px] text-white border-solid p-2 border border-white bg-pointColor1"
        onClick={onClick}
      >
        문제 추가하기
      </button>
    </div>
  );
};

export default PlusQuestionBtn;
