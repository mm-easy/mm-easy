import { getGameScore } from '@/api/game_scrore';
import { getQuizRank } from '@/api/quizzes';
import { getTopQuizScores } from '@/api/tries';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const RankingSection = () => {
  const { data: gameScores, isLoading: isLoadingGameScores } = useQuery({
    queryKey: ['getScore'],
    queryFn: getGameScore
  });

  const { data: quizRank, isLoading: isLoadingQuizRank } = useQuery({
    queryKey: ['getQuizRanking'],
    queryFn: getQuizRank
  });

  const { data: quizScoreRank, isLoading: isLoadingQuizScoreRank } = useQuery({
    queryKey: ['topQuizScores'],
    queryFn: getTopQuizScores
  });

  if (isLoadingGameScores || isLoadingQuizRank || isLoadingQuizScoreRank) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4 text-lg text-pointColor1 bg-bgColor1 font-bold border-y-2 border-solid border-pointColor1">
        <div className="flex items-center justify-center">
          <p className="w-5/6 ml-10">명예의 전당</p>
        </div>
      </div>
      <section className="flex flex-col justify-center items-center">
        <div className="w-5/6 flex">
          <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
            <div className="flex">
              <h2 className="mb-4 text-lg font-bold">이번주 퀴즈 만들기 장인</h2>
            </div>
            {quizRank &&
              quizRank.map((item, index) => (
                <div
                  key={index}
                  className={`mt-4 pb-4 flex items-center ${
                    index !== quizRank.length - 1 && 'border-b border-solid border-pointColor1'
                  }`}
                >
                  {item.avatar_img_url && (
                    <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                      <Image
                        src={`${profileStorageUrl}/${item.avatar_img_url}`}
                        alt="프로필 이미지"
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                    <h2 className="text-pointColor1">만든 퀴즈수: {item.quiz_count}</h2>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
            <div className="flex">
              <h2 className="mb-4 text-lg font-bold">이번주 퀴즈 마스터</h2>
            </div>
            {quizScoreRank &&
              quizScoreRank.map((item, index) => (
                <div
                  key={index}
                  className={`mt-4 pb-4 flex items-center ${
                    index !== quizScoreRank.length - 1 && 'border-b border-solid border-pointColor1'
                  }`}
                >
                  {item.avatar_img_url && (
                    <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                      <Image
                        src={`${profileStorageUrl}/${item.avatar_img_url}`}
                        alt="프로필 이미지"
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                    <h2 className="text-pointColor1">점수: {item.score}</h2>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-1/3 p-8 border-solid border-pointColor1">
            <div className="flex">
              <h2 className="mb-4 text-lg font-bold">이번주 키보드 워리어</h2>
            </div>
            {gameScores &&
              gameScores.map((score, index) => (
                <div
                  key={index}
                  className={`mt-4 pb-4 flex items-center ${
                    index !== gameScores.length - 1 && 'border-b border-solid border-pointColor1'
                  }`}
                >
                  {score.avatar_img_url && (
                    <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                      <Image
                        src={`${profileStorageUrl}/${score.avatar_img_url}`}
                        alt="프로필 이미지"
                        width={60}
                        height={60}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium mb-1">{score.nickname}</h3>
                    <h2 className="text-pointColor1">점수: {score.score}</h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RankingSection;
