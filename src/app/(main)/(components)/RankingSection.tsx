import { getGameScore } from '@/api/game_scrore';
import { getQuizRank } from '@/api/quizzes';
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

  if (isLoadingGameScores || isLoadingQuizRank) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4 text-2xl text-pointColor1 bg-bgColor1 font-bold border-y border-solid border-pointColor1">
        <p className="ml-4">랭킹</p>
      </div>
      <section className="">
        <div className="flex">
          <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
            <div className="flex">
              <h2 className="mb-4 text-lg font-bold">이번주 퀴즈 만들기 장인</h2>
            </div>
            {quizRank &&
              quizRank.map((quizRank, index) => (
                <div key={index} className="mt-4 border-b border-solid border-pointColor1 pb-4 flex items-center">
                  {quizRank.avatar_img_url && (
                    <div className="mr-4 rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                      <Image
                        src={`${profileStorageUrl}/${quizRank.avatar_img_url}`}
                        alt="프로필 이미지"
                        width={60}
                        height={60}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium mb-1">{quizRank.nickname}</h3>
                    <h2 className="text-pointColor1">만든 퀴즈수: {quizRank.quiz_count}</h2>
                  </div>
                </div>
              ))}
          </div>
          <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
            <div className="flex">
              <h2 className="mb-4 text-lg font-bold">이번주 퀴즈 마스터</h2>
            </div>
            {gameScores &&
              gameScores.map((score, index) => (
                <div key={index} className="mt-4 border-b border-solid border-pointColor1 pb-4 flex items-center">
                  {score.avatar_img_url && (
                    <div className="mr-4 rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                      <Image
                        src={score.avatar_img_url}
                        alt="프로필 이미지"
                        width={60}
                        height={60}
                        className="object-cover"
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
          <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
            <div className="flex">
              <h2 className="mb-4 text-lg font-bold">이번주 키보드 워리어</h2>
            </div>
            {gameScores &&
              gameScores.map((score, index) => (
                <div key={index} className="mt-4 border-b border-solid border-pointColor1 pb-4 flex items-center">
                  {score.avatar_img_url && (
                    <div className="mr-4 rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                      <Image
                        src={score.avatar_img_url}
                        alt="프로필 이미지"
                        width={60}
                        height={60}
                        className="object-cover"
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
