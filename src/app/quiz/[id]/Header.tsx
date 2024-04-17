import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleExitBtn = () => {
    if (isAnswerWritten && !resultMode) {
      if (!window.confirm('변경사항이 저장되지 않을 수 있습니다. 계속하시겠습니까?')) return;
    }
    router.push('/quiz/list');
  };

  return (
    <header className="h-[8vh] reslative flex leading-[7.5vh] border-solid border-b-2 border-pointColor1">
      <h2 className="w-[calc(16%+2px)] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
        퀴즈 풀기
      </h2>
      <h2 className="w-[8%] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
        난이도
      </h2>
      <h3 className="w-[8%] text-center border-solid border-r-2 border-pointColor1">
        {level === 1 ? '순한맛' : level === 2 ? '중간맛' : '매운맛'}
      </h3>
      <h2 className="w-[8%] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
        제목
      </h2>
      <h3 className="pl-[2%]">{title}</h3>
      <button
        className="w-[5%] h-[calc(8vh-2px)] absolute right-0 font-bold text-pointColor1 bg-bgColor1 border-l-2 border-solid border-pointColor1"
        onClick={handleExitBtn}
      >
        ✕
      </button>
    </header>
  );
};

export default Header;
