import VerticalBlueLine from './VerticalBlueLine';
import Link from 'next/link';
import LoadingImg from '@/components/common/LoadingImg';
import Image from 'next/image';
import { getQuizzes } from '@/api/quizzes';
import { getMyGameScore } from '@/api/game_scrore';
import { useQuery } from '@tanstack/react-query';
import { getMyQuizScore } from '@/api/tries';
import { assetsStorageUrl } from '@/utils/supabase/storage';

import type { Quiz, Score } from '@/types/quizzes';
import type { User } from '@/types/users';
import { useAtom } from 'jotai';
import useMultilingual from '@/utils/useMultilingual';
import { langAtom } from '@/store/store';

const MyLevelAndScore = ({ data }: { data: User }) => {
  const [lang] = useAtom(langAtom);
  const m = useMultilingual('my-profile');

  /** 등록된 퀴즈 가져오기 */
  const { data: quizData } = useQuery<Quiz[]>({
    queryKey: ['quizzes'],
    queryFn: async () => {
      try {
        const fetchData = await getQuizzes();
        if (!fetchData) return [];
        return fetchData;
      } catch (error) {
        throw error;
      }
    }
  });

  /** 나의 게임 점수 가져오기 */
  const { data: myGameScore } = useQuery({
    queryKey: ['my_gameScore'],
    queryFn: async () => {
      try {
        const fetchData = await getMyGameScore(data.id);
        return fetchData;
      } catch (error) {
        throw error;
      }
    }
  });

  /** 내가 푼 퀴즈 점수들 가져오기 */
  const {
    data: myQuizScores,
    isLoading,
    isError
  } = useQuery<Score[]>({
    queryKey: ['quiz_tries'],
    queryFn: async () => {
      try {
        const fetchdata = await getMyQuizScore(data.email);
        if (!fetchdata) return [];
        return fetchdata;
      } catch (error) {
        throw error;
      }
    }
  });

  if (isLoading) return <LoadingImg height="84vh" />;
  if (isError) return <div>에러...</div>;

  const totalQuizScore = myQuizScores?.reduce((a, b) => {
    return a + b.score;
  }, 0);

  const myTotalScore = (totalQuizScore ?? 0) + (myGameScore ?? 0);
  const myLevel =
    myTotalScore < 5000 ? 1 : myTotalScore < 15000 ? 2 : myTotalScore < 35000 ? 3 : myTotalScore < 70000 ? 4 : 5;
  const imageUrl = `${assetsStorageUrl}/level_${myLevel}.png`;

  return (
    <main className="w-full h-full flex flex-col justify-center items-center bg-bgColor2 border-solid border-t border-pointColor1">
      <div className="sm:w-full sm:py-10 sm:text-center sm:text-lg text-xl font-bold">
        <span>{m('MY_QUIZ_INFO_TEXT1')}</span>
        <span className="text-pointColor1">{lang === 'en' ? myQuizScores?.length : quizData?.length}</span>
        <span>{m('MY_QUIZ_INFO_TEXT2')}</span>
        <span className="text-pointColor1">{lang === 'en' ? quizData?.length : myQuizScores?.length}</span>
        <span>{m('MY_QUIZ_INFO_TEXT3')}</span>
      </div>
      <div className="sm:px-5 sm:w-full sm:grid sm:grid-cols-2 flex sm:gap-0 gap-7 sm:mb-4 sm:mt-4 mt-10 font-semibold">
        <div className="sm:w-full sm:h-full sm:p-5 flex flex-col sm:justify-center items-center w-48 sm:border-solid sm:border-b-1 sm:border-pointColor1">
          <p>{m('LEVEL')}</p>
          <p className="flex mt-4 sm:text-5xl text-3xl text-pointColor1">
            <Image
              src={imageUrl}
              alt={`Level ${myLevel}`}
              width={30}
              height={20}
              className="w-full h-full object-cover"
            />
          </p>
        </div>
        <VerticalBlueLine />
        <div className="sm:w-full sm:h-full sm:p-5 flex flex-col sm:justify-center items-center w-48 sm:border-solid sm:border-l-1 sm:border-b-1 sm:border-pointColor1">
          <p>{m('QUIZ_SCORE')}</p>
          <p className="mt-5 sm:text-5xl text-3xl text-pointColor1">{totalQuizScore ?? 0}</p>
        </div>
        <VerticalBlueLine />
        <div
          className={`sm:w-full sm:h-full sm:p-5 flex flex-col sm:justify-center items-center ${
            lang === 'en' ? 'w-48' : 'sm:w-48 w-48'
          }`}
        >
          <p>{m('TYPING_GAME_SCORE')}</p>
          <p className="mt-5 sm:text-5xl text-3xl text-pointColor1">{myGameScore ?? 0}</p>
        </div>
        <VerticalBlueLine />
        <div className="sm:w-full sm:h-full sm:p-5 flex flex-col sm:justify-center items-center w-48 sm:border-solid sm:border-l-1 sm:border-pointColor1">
          <p>{m('TOTAL_SCORE')}</p>
          <p className="mt-5 sm:text-5xl text-3xl text-pointColor1">{myTotalScore}</p>
        </div>
      </div>
      <div className="text-center sm:mb-10 mt-10 text-pointColor1 underline underline-offset-4">
        <Link href="/my-activity">{m('TO_MY_ACTIVITY')}</Link>
      </div>
    </main>
  );
};

export default MyLevelAndScore;
