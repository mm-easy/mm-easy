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
import { assetsStorageUrl } from '@/utils/supabase/storage';
import RankingBtn from './RankingBtn';

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

  const rankingImages = [
    `${assetsStorageUrl}/ranking_1.png`, // 1등 이미지 URL
    `${assetsStorageUrl}/ranking_2.png`, // 2등 이미지 URL
    `${assetsStorageUrl}/ranking_3.png` // 3등 이미지 URL
  ];

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
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                        <Image
                          src={`${profileStorageUrl}/${item.avatar_img_url}`}
                          alt="프로필 이미지"
                          width={60}
                          height={60}
                          className="w-full h-full object-cover bg-white"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                        <h2 className="text-pointColor1">
                          {m('COUNT')} {item.quiz_count}
                        </h2>
                      </div>
                    </div>
                    {rankingImages[index] && (
                      <div className="w-8 h-8">
                        <Image
                          src={rankingImages[index]}
                          alt={`Rank ${index + 1}`}
                          width={32}
                          height={32}
                          quality={100}
                        />
                      </div>
                    )}
                  </div>
                )}
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
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                        <Image
                          src={`${profileStorageUrl}/${item.avatar_img_url}`}
                          alt="프로필 이미지"
                          width={60}
                          height={60}
                          className="w-full h-full object-cover bg-white"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium mb-1">{item.nickname}</h3>
                        <h2 className="text-pointColor1">
                          {m('SCORE')} {item.score}
                        </h2>
                      </div>
                    </div>
                    <div className="w-8 h-8">
                      <Image
                        src={rankingImages[index]}
                        alt={`Rank ${index + 1}`}
                        width={32}
                        height={32}
                        quality={100}
                      />
                    </div>
                  </div>
                )}
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
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1 flex-shrink-0">
                        <Image
                          src={`${profileStorageUrl}/${score.avatar_img_url}`}
                          alt="프로필 이미지"
                          width={60}
                          height={60}
                          className="w-full h-full object-cover bg-white"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-xl font-medium mb-1">{score.nickname}</h3>
                        <h2 className="text-pointColor1">
                          {m('SCORE')} {score.score}
                        </h2>
                      </div>
                    </div>
                    <div className="w-8 h-8">
                      <Image
                        src={rankingImages[index]}
                        alt={`Rank ${index + 1}`}
                        width={32}
                        height={32}
                        quality={100}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
      <div className="hidden sm:block sm:bg-bgColor2">
        <div className="flex-col items-center w-full px-6 py-4 justify-between border-none">
          <p className="text-lg font-bold text-pointColor1">{m('HALL_OF_FAME')}</p>
          <div className="flex justify-center mt-4 items-center gap-4">
            <RankingBtn
              onClick={() => setActiveRanking('quizCreator')}
              activeRanking={activeRanking}
              rankingTitle="quizCreator"
              text={m('RANKING_BUTTON1')}
            />
            <RankingBtn
              onClick={() => setActiveRanking('quizMaster')}
              activeRanking={activeRanking}
              rankingTitle="quizMaster"
              text={m('RANKING_BUTTON2')}
            />
            <RankingBtn
              onClick={() => setActiveRanking('keyboardWarrior')}
              activeRanking={activeRanking}
              rankingTitle="keyboardWarrior"
              text={m('RANKING_BUTTON3')}
            />
          </div>
        </div>
        <section className="flex bg-bgColor2 items-center">
          {activeRanking === 'quizCreator' && (
            <div className="flex-col w-full p-4">
              <p className="font-bold text-center text-lg">{m('QUIZ_CREATOR')}</p>
              {quizRank && quizRank.length > 0 ? (
                <div>
                  {quizRank.map((item, index) => (
                    <div
                      key={index}
                      className={`mt-4 px-8 pb-4 flex justify-between items-center animate-drop-in ${
                        index !== quizRank.length - 1 ? 'border-b border-solid border-pointColor1' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        {item.avatar_img_url && (
                          <div className="mr-4 w-[65px] h-[65px] rounded-full overflow-hidden border-2 border-solid border-pointColor1">
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
                          <h3 className="text-lg font-semibold mb-1">{item.nickname}</h3>
                          <h2 className="text-pointColor1">
                            {m('COUNT')} {item.quiz_count}
                          </h2>
                        </div>
                      </div>
                      <div className="w-8 h-8">
                        <Image
                          src={rankingImages[index]}
                          alt={`Rank ${index + 1}`}
                          width={32}
                          height={32}
                          quality={100}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{m('TAKE_THE_CHALLENGE')}</p>
              )}
            </div>
          )}
          {activeRanking === 'quizMaster' && (
            <div className="flex-col p-4 w-full">
              <p className="font-bold text-center text-lg">{m('QUIZ_MASTER')}</p>
              {quizScoreRank && quizScoreRank.length > 0 ? (
                <div>
                  {quizScoreRank.map((item, index) => (
                    <div
                      key={index}
                      className={`mt-4 px-8 pb-4 flex justify-between items-center animate-drop-in ${
                        index !== quizScoreRank.length - 1 && 'border-b border-solid border-pointColor1'
                      }`}
                    >
                      <div className="flex items-center">
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
                          <h3 className="text-lg font-semibold mb-1">{item.nickname}</h3>
                          <h2 className="text-pointColor1">
                            {m('SCORE')} {item.score}
                          </h2>
                        </div>
                      </div>
                      <div className="w-8 h-8">
                        <Image
                          src={rankingImages[index]}
                          alt={`Rank ${index + 1}`}
                          width={32}
                          height={32}
                          quality={100}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{m('TAKE_THE_CHALLENGE')}</p>
              )}
            </div>
          )}
          {activeRanking === 'keyboardWarrior' && gameScores && (
            <div className="flex-col p-4 w-full">
              <p className="font-bold text-center text-lg">{m('KEYBOARD_WARRIOR')}</p>
              <div>
                {gameScores.map((item, index) => (
                  <div
                    key={index}
                    className={`mt-4 px-8 pb-4 flex justify-between items-center animate-drop-in ${
                      index !== gameScores.length - 1 ? 'border-b border-solid border-pointColor1' : ''
                    }`}
                  >
                    <div className="flex items-center">
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
                        <h3 className="text-lg font-semibold mb-1">{item.nickname}</h3>
                        <h2 className="text-pointColor1">
                          {m('SCORE')} {item.score}
                        </h2>
                      </div>
                    </div>
                    <div className="w-8 h-8">
                      <Image
                        src={rankingImages[index]}
                        alt={`Rank ${index + 1}`}
                        width={32}
                        height={32}
                        quality={100}
                      />
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
