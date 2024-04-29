import { MouseEventHandler } from 'react';

const RankingBtn = ({
  onClick,
  activeRanking,
  rankingTitle,
  text
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  activeRanking: string;
  rankingTitle: string;
  text: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-[27px] py-[10px] text-pointColor1 text-sm hidden sm:block border-2 border-solid border-pointColor1 rounded-full ${
        activeRanking === rankingTitle ? 'bg-pointColor1 text-white font-bold' : 'bg-white text-pointColor1 font-bold'
      }`}
    >
      {text}
    </button>
  );
};

export default RankingBtn;
