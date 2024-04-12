import VerticalBlueLine from './VerticalBlueLine';
import Link from 'next/link';
import { getQuizzes } from '@/api/quizzes';
import { getMyGameScore } from '@/api/game_scrore';
import { useQuery } from '@tanstack/react-query';
import { getQuizzesISolved } from '@/api/tries';
import { getMyQuizScore } from '@/api/tries';

import type { Quiz, QuizTry } from '@/types/quizzes';
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

  /** 나의 퀴즈 점수 가져오기 */
  const { data: myQuizScore } = useQuery({
    queryKey: ['my_quizScore'],
    queryFn: async () => {
      try {
        const fetchData = await getMyQuizScore(data.id);
        return fetchData && 0;
      } catch (error) {
        throw error;
      }
    }
  });

  /** 내가 푼 퀴즈 정보 가져오기 */
  const { data: solvedQuizData } = useQuery<QuizTry[]>({
    queryKey: ['quiz_tries'],
    queryFn: async () => {
      try {
        const fetchdata = await getQuizzesISolved(data.email);
        if (!fetchdata) return [];
        return fetchdata;
      } catch (error) {
        throw error;
      }
    }
  });

  return (
    <main className="w-full h-full flex flex-col items-center bg-bgColor2 border-solid border-t border-pointColor1">
      <div className="mt-10 text-xl font-semibold">
        전체 올라온 퀴즈 <span className="text-pointColor1">{quizData?.length}</span>개 중{' '}
        <span className="text-pointColor1">{solvedQuizData?.length}</span>개의 퀴즈를 풀었어요!
      </div>
      <div className="flex gap-7 mt-10 font-semibold">
        <div className="flex flex-col items-center w-32">
          <p>레벨</p>
          <p className="mt-5 text-3xl text-pointColor1">999</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>퀴즈 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">{myQuizScore}</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>타자연습 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">{myGameScore}</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>총 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">{myQuizScore && myGameScore && myQuizScore + myGameScore}</p>
        </div>
      </div>
      <div className="text-center mt-10 text-pointColor1 underline underline-offset-4">
        <Link href="/my-activity">나의 활동 보러가기</Link>
      </div>
    </main>
  );
};

export default MyLevelAndScore;
