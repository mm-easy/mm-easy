import { useRouter } from 'next/navigation';

const Header = ({
  level,
  title,
  isAnswerWritten,
  resultMode,
  headerText,
  levelText,
  titleText
}: {
  level: number;
  title: string;
  isAnswerWritten: number;
  resultMode: boolean;
  headerText: string;
  levelText: string;
  titleText: string;
}) => {
  const router = useRouter();

  const handleExitBtn = () => {
    if (isAnswerWritten && !resultMode) {
      if (!window.confirm('변경사항이 저장되지 않을 수 있습니다. 계속하시겠습니까?')) return;
    }
    router.push('/quiz/list');
  };

  return (
    <header className="w-full h-[8vh] flex justify-between leading-[8vh] border-solid border-b-2 border-pointColor1 sm:border-0">
      <h2 className="w-[calc(16%+2px)] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
        {headerText}
      </h2>
      <section className="w-[calc(84%-2px)] flex justify-between">
        <div className="w-[95%] flex sm:flex-col">
          <h2 className="w-[10%] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
            {levelText}
          </h2>
          <h3 className="w-[10%] sm:w-full sm:h-3/4 sm:pl-4 text-center sm:text-left sm:font-semibold sm:text-pointColor1 border-solid border-r-2 border-pointColor1 sm:border-0">
            {level === 1 ? '순한맛' : level === 2 ? '중간맛' : '매운맛'}
          </h3>
          <h2 className="w-[10%] sm:hidden text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
            {titleText}
          </h2>
          <h3 className="sm:w-full pl-[2%] sm:pl-4 sm:text-xl sm:font-semibold">{title}</h3>
        </div>
        <button
          className="w-[6%] sm:hidden float-right h-[calc(8vh-2px)] text-3xl font-bold text-pointColor1 bg-bgColor1 border-l-2 border-solid border-pointColor1"
          onClick={handleExitBtn}
        >
          ✕
        </button>
      </section>
    </header>
  );
};

export default Header;
