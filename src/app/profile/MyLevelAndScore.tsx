import VerticalBlueLine from './VerticalBlueLine';
import Link from 'next/link';
import LoadingImg from '@/components/common/LoadingImg';
import { getQuizzes } from '@/api/quizzes';
import { getMyGameScore } from '@/api/game_scrore';
import { useQuery } from '@tanstack/react-query';
import { getMyQuizScore } from '@/api/tries';

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

  return (
    <main className="w-full h-full flex flex-col justify-center items-center bg-bgColor2 border-solid border-t border-pointColor1">
      <div className="text-xl font-semibold">
        <span>{m('MY_QUIZ_INFO_TEXT1')}</span>
        <span className="text-pointColor1">{lang === 'en' ? myQuizScores?.length : quizData?.length}</span>
        <span>{m('MY_QUIZ_INFO_TEXT2')}</span>
        <span className="text-pointColor1">{lang === 'en' ? quizData?.length : myQuizScores?.length}</span>
        <span>{m('MY_QUIZ_INFO_TEXT3')}</span>
      </div>
      <div className="flex gap-7 mt-10 font-semibold">
        <div className="flex flex-col items-center w-32">
          <p>{m('LEVEL')}</p>
          <p className="mt-5 text-3xl text-pointColor1">Lv. {myLevel}</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>{m('QUIZ_SCORE')}</p>
          <p className="mt-5 text-3xl text-pointColor1">{totalQuizScore ?? 0}</p>
        </div>
        <VerticalBlueLine />
        <div className={`flex flex-col items-center ${lang === 'en' ? '48' : 'w-32'}`}>
          <p>{m('TYPING_GAME_SCORE')}</p>
          <p className="mt-5 text-3xl text-pointColor1">{myGameScore ?? 0}</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>{m('TOTAL_SCORE')}</p>
          <p className="mt-5 text-3xl text-pointColor1">{myTotalScore}</p>
        </div>
      </div>
      <div className="text-center mt-10 text-pointColor1 underline underline-offset-4">
        <Link href="/my-activity">{m('TO_MY_ACTIVITY')}</Link>
      </div>
    </main>
  );
};

export default MyLevelAndScore;
