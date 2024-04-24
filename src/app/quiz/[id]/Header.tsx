import { useRouter } from 'next/navigation';
import useMultilingual from '@/utils/useMultilingual';
import ExitButton from '@/components/common/ExitButton';

const Header = ({
  level,
  title,
  isAnswerWritten,
  resultMode
}: {
  level: number;
  title: string;
  isAnswerWritten: number;
  resultMode: boolean;
}) => {
  const m = useMultilingual('quiz-try');
  const router = useRouter();

  const handleExitBtn = () => {
    if (isAnswerWritten && !resultMode) {
      if (!window.confirm(m('ASK_TO_EXIT'))) return;
    }
    router.push('/quiz/list');
  };

  return (
    <header className="w-full h-[8vh] flex justify-between leading-[8vh] border-solid border-b-2 border-pointColor1 sm:border-0">
      <h2 className="w-[calc(16%+2px)] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
        {m('HEADER')}
      </h2>
      <section className="w-[calc(84%-2px)] flex justify-between">
        <div className="w-[95%] flex sm:flex-col">
          <h2 className="w-[10%] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
            {m('LEVEL')}
          </h2>
          <h3 className="w-[10%] sm:w-full sm:h-3/4 sm:pl-4 text-center sm:text-left sm:font-semibold sm:text-pointColor1 border-solid border-r-2 border-pointColor1 sm:border-0">
            {level === 1 ? m('QUIZ_LEVEL_1') : level === 2 ? m('QUIZ_LEVEL_2') : m('QUIZ_LEVEL_3')}
          </h3>
          <h2 className="w-[10%] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
            {m('TITLE')}
          </h2>
          <h3 className="sm:w-full pl-[2%] sm:pl-4 sm:text-xl sm:font-semibold">{title}</h3>
        </div>
        <ExitButton size="sm" exitText={m('EXIT_BTN')} onClick={handleExitBtn} />
      </section>
    </header>
  );
};

export default Header;
