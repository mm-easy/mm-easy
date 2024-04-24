import Image from 'next/image';
import LoadingImg from '@/components/common/LoadingImg';
import useMultilingual from '@/utils/useMultilingual';
import { getGameScore } from '@/api/game_scrore';
import { getQuizRank } from '@/api/quizzes';
import { getTopQuizScores } from '@/api/tries';
import { profileStorageUrl } from '@/utils/supabase/storage';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SlRefresh } from 'react-icons/sl';

const RankingSection = () => {
  const m = useMultilingual('ranking-section');
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeRanking, setActiveRanking] = useState('quizCreator');

  const {
    data: gameScores,
    isLoading: isLoadingGameScores,
    refetch: refetchGameScores
  } = useQuery({
    queryKey: ['getScore'],
    queryFn: getGameScore
  });

  const {
    data: quizRank,
    isLoading: isLoadingQuizRank,
    refetch: refetchQuizRank
  } = useQuery({
    queryKey: ['getQuizRanking'],
    queryFn: getQuizRank
  });

  const {
    data: quizScoreRank,
    isLoading: isLoadingQuizScoreRank,
    refetch: refetchQuizScoreRank
  } = useQuery({
    queryKey: ['topQuizScores'],
    queryFn: getTopQuizScores
  });

  const refreshAllData = async () => {
    await Promise.all([refetchGameScores(), refetchQuizRank(), refetchQuizScoreRank()]);
    setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger re-render
  };

  if (isLoadingGameScores || isLoadingQuizRank || isLoadingQuizScoreRank) {
    return <LoadingImg height="400px" />;
  }

  return (
    <>
      <div className="flex justify-between items-center w-full px-6 py-4 bg-bgColor1 border-y-2 border-solid border-pointColor1 sm:hidden">
        <p className="text-lg font-bold text-pointColor1">{m('HALL_OF_FAME')}</p>
        <button onClick={refreshAllData} className="flex items-center text-pointColor1 text-xl sm:hidden">
          <SlRefresh className="hover:animate-spin-slow" />
        </button>
      </div>
      <section className="flex bg-bgColor2 sm:hidden" key={refreshKey}>
        <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
          <div className="flex">
            <h2 className="mb-4 text-lg font-bold">{m('QUIZ_CREATOR')}</h2>
          </div>
          {quizRank &&
            quizRank.map((item, index) => (
              <div
                key={index}
                className={`mt-4 pb-4 flex items-center animate-drop-in ${
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
                      className="w-full h-full object-cover bg-white"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                  <h2 className="text-pointColor1">
                    {m('COUNT')} {item.quiz_count}
                  </h2>
                </div>
              </div>
            ))}
        </div>
        <div className="w-1/3 p-8 border-r border-solid border-pointColor1">
          <div className="flex">
            <h2 className="mb-4 text-lg font-bold">{m('QUIZ_MASTER')}</h2>
          </div>
          {quizScoreRank &&
            quizScoreRank.map((item, index) => (
              <div
                key={index}
                className={`mt-4 pb-4 flex items-center animate-drop-in ${
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
                      className="w-full h-full object-cover bg-white"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                  <h2 className="text-pointColor1">
                    {m('SCORE')} {item.score}
                  </h2>
                </div>
              </div>
            ))}
        </div>
        <div className="w-1/3 p-8 border-solid border-pointColor1">
          <div className="flex">
            <h2 className="mb-4 text-lg font-bold">{m('KEYBOARD_WARRIOR')}</h2>
          </div>
          {gameScores &&
            gameScores.map((score, index) => (
              <div
                key={index}
                className={`mt-4 pb-4 flex items-center animate-drop-in ${
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
                      className="w-full h-full object-cover bg-white"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium mb-1">{score.nickname}</h3>
                  <h2 className="text-pointColor1">
                    {m('SCORE')} {score.score}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </section>
      <div className="hidden sm:block sm:bg-bgColor2">
        <div className="flex items-center w-full px-6 py-4 justify-between border-none">
          <p className="text-lg font-bold text-pointColor1">{m('HALL_OF_FAME')}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveRanking('quizCreator')}
              className={`text-pointColor1 hidden sm:block ${activeRanking === 'quizCreator' ? 'font-bold' : ''}`}
            >
              만들기
            </button>
            <button
              onClick={() => setActiveRanking('quizMaster')}
              className={`text-pointColor1 hidden sm:block ${activeRanking === 'quizMaster' ? 'font-bold' : ''}`}
            >
              풀기
            </button>
            <button
              onClick={() => setActiveRanking('keyboardWarrior')}
              className={`text-pointColor1 hidden sm:block ${activeRanking === 'keyboardWarrior' ? 'font-bold' : ''}`}
            >
              게임
            </button>
          </div>
        </div>
        <section className="flex bg-bgColor2">
          {activeRanking === 'quizCreator' && quizRank && (
            <div className="flex-col p-4 w-full">
              <p className="font-bold text-lg">{m('QUIZ_CREATOR')}</p>
              <div className="">
                {quizRank.map((item, index) => (
                  <div
                    key={index}
                    className={`mt-4 pb-4 flex items-center animate-drop-in ${
                      index !== quizRank.length - 1 ? 'border-b border-solid border-pointColor1' : ''
                    }`}
                  >
                    {item.avatar_img_url && (
                      <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                        <Image
                          src={`${profileStorageUrl}/${item.avatar_img_url}`}
                          alt="프로필 이미지"
                          width={60}
                          height={60}
                          className="w-full h-full object-cover bg-white"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                      <h2 className="text-pointColor1">
                        {m('COUNT')} {item.quiz_count}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeRanking === 'quizMaster' && (
            <div className="flex-col p-4 w-full">
              <p className="font-bold text-lg">{m('QUIZ_MASTER')}</p>
              {quizScoreRank && quizScoreRank.length > 0 ? (
                <div>
                  {quizScoreRank.map((item, index) => (
                    <div
                      key={index}
                      className={`mt-4 pb-4 flex items-center animate-drop-in ${
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
                            className="w-full h-full object-cover bg-white"
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                        <h2 className="text-pointColor1">
                          {m('SCORE')} {item.score}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No quiz scores available.</p>
              )}
            </div>
          )}
          {activeRanking === 'keyboardWarrior' && gameScores && (
            <div className="flex-col p-4 w-full">
              <p className="font-bold text-lg">{m('KEYBOARD_WARRIOR')}</p>
              <div>
                {gameScores.map((item, index) => (
                  <div
                    key={index}
                    className={`mt-4 pb-4 flex items-center animate-drop-in ${
                      index !== gameScores.length - 1 ? 'border-b border-solid border-pointColor1' : ''
                    }`}
                  >
                    {item.avatar_img_url && (
                      <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                        <Image
                          src={`${profileStorageUrl}/${item.avatar_img_url}`}
                          alt="프로필 이미지"
                          width={60}
                          height={60}
                          className="w-full h-full object-cover bg-white"
                        />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                      <h2 className="text-pointColor1">
                        {m('SCORE')} {item.score}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default RankingSection;
