import { langAtom } from '@/store/store';
import useMultilingual from '@/utils/useMultilingual';
import { useAtom } from 'jotai';

interface PlusQuestionBtnProps {
  disabled: boolean;
  onClick: () => void;
}

const PlusQuestionBtn: React.FC<PlusQuestionBtnProps> = ({ disabled, onClick }) => {
  const [lang, setLang] = useAtom(langAtom);
  const m = useMultilingual(lang, 'quizEditor');

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className={`w-[570px] mb-9 p-2 text-white ${
          disabled ? 'bg-grayColor2 cursor-default' : 'bg-pointColor1'
        } rounded-md`}
        onClick={onClick}
      >
        {m('ADD_QUESTION_BTN')}
      </button>
    </div>
  );
};

export default PlusQuestionBtn;
