const Header = ({ level, title }: { level: number; title: string }) => {
  return (
    <header className="h-[8vh] flex leading-[7.5vh] border-solid border-b-2 border-pointColor1">
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
    </header>
  );
};

export default Header;
