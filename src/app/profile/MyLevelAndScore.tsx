import VerticalBlueLine from './VerticalBlueLine';
import Link from 'next/link';
import { getQuizzes } from '@/api/quizzes';
import { getMyGameScore } from '@/api/game_scrore';
import { useQuery } from '@tanstack/react-query';
import { getMyQuizScore } from '@/api/tries';

import type { Quiz, Score } from '@/types/quizzes';
import type { User } from '@/types/users';

const MyLevelAndScore = ({ data }: { data: User }) => {
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

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러...</div>;

  const totalQuizScore = myQuizScores?.reduce((a, b) => {
    return a + b.score;
  }, 0);

  return (
    <main className="w-full h-full flex flex-col items-center bg-bgColor2 border-solid border-t border-pointColor1">
      <div className="mt-10 text-xl font-semibold">
        전체 올라온 퀴즈 <span className="text-pointColor1">{quizData?.length}</span>개 중{' '}
        <span className="text-pointColor1">{myQuizScores?.length}</span>개의 퀴즈를 풀었어요!
      </div>
      <div className="flex gap-7 mt-10 font-semibold">
        <div className="flex flex-col items-center w-32">
          <p>레벨</p>
          <p className="mt-5 text-3xl text-pointColor1">999</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>퀴즈 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">{totalQuizScore ?? 0}</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>타자연습 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">{myGameScore ?? 0}</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>총 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">{(totalQuizScore ?? 0) + (myGameScore ?? 0)}</p>
        </div>
      </div>
      <div className="text-center mt-10 text-pointColor1 underline underline-offset-4">
        <Link href="/my-activity">나의 활동 보러가기</Link>
      </div>
    </main>
  );
};

export default MyLevelAndScore;
