import Link from 'next/link';

const Header = ({ level, title }: { level: number; title: string }) => {
  const exitBtnWidth = Math.floor(window.innerHeight * 0.08);
  console.log(exitBtnWidth);

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
        className={`w-[${exitBtnWidth}px] h-[calc(8vh-2px)] absolute right-0 bg-bgColor1 border-l-2 border-solid border-pointColor1`}
      >
        ✕
      </button>
    </header>
  );
};

export default Header;
