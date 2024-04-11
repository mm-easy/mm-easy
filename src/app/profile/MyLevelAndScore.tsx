import VerticalBlueLine from './VerticalBlueLine';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/supabase';
import { getQuizzes } from '@/api/quizzes';

import type { Quiz } from '@/types/quizzes';
import type { User } from '@/types/users';
import { getMyGameScore } from '@/api/game_scrore';

const MyLevelAndScore = ({ currentUser }: { currentUser: User }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [myGameScore, setMyGameScore] = useState(0);

  /** 등록된 퀴즈 가져오기 */
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizData = await getQuizzes();
        const myGameScoreData = await getMyGameScore(currentUser.id);

        if (!quizData || !myGameScoreData) return;
        setQuizzes(quizData);
        setMyGameScore(myGameScoreData);
        console.log('이이이', myGameScoreData);
      } catch (error) {
        console.error('데이터 가져오기 에러', error);
      }
    };
    fetchQuizData();
  }, []);

  return (
    <main className="w-full h-full flex flex-col items-center bg-bgColor2 border-solid border-t border-pointColor1">
      <div className="mt-10 text-xl font-semibold">
        전체 올라온 퀴즈 <span className="text-pointColor1">{quizzes.length}</span>개 중{' '}
        <span className="text-pointColor1">000</span>개의 퀴즈를 풀었어요!
      </div>
      <div className="flex gap-7 mt-10 font-semibold">
        <div className="flex flex-col items-center w-32">
          <p>레벨</p>
          <p className="mt-5 text-3xl text-pointColor1">999</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>퀴즈 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">999</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>타자연습 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">{myGameScore}</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>총 점수</p>
          <p className="mt-5 text-3xl text-pointColor1">999</p>
        </div>
      </div>
      <div className="text-center mt-10 text-pointColor1 underline underline-offset-4">
        <Link href="/my-activity">나의 활동 보러가기</Link>
      </div>
    </main>
  );
};

export default MyLevelAndScore;
