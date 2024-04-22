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
    <header className="w-full h-[8vh] flex justify-between leading-[8vh] border-solid border-b-2 border-pointColor1">
      <h2 className="w-[calc(16%+2px)] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
        {headerText}
      </h2>
      <section className="w-[calc(84%-2px)] flex justify-between">
        <div className="w-[95%] flex">
          <h2 className="w-[10%] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
            {levelText}
          </h2>
          <h3 className="w-[10%] text-center border-solid border-r-2 border-pointColor1">
            {level === 1 ? '순한맛' : level === 2 ? '중간맛' : '매운맛'}
          </h3>
          <h2 className="w-[10%] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
            {titleText}
          </h2>
          <h3 className="pl-[2%]">{title}</h3>
        </div>
        <button
          className="w-[6%] float-right h-[calc(8vh-2px)] font-bold text-pointColor1 bg-bgColor1 border-l-2 border-solid border-pointColor1"
          onClick={handleExitBtn}
        >
          ✕
        </button>
      </section>
    </header>
  );
};

export default Header;
