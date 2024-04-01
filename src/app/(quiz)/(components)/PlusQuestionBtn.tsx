interface PlusQuestionBtnProps {
  onClick: () => void;
}

const PlusQuestionBtn: React.FC<PlusQuestionBtnProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      질문 추가하기
    </button>
  );
};

export default PlusQuestionBtn;
