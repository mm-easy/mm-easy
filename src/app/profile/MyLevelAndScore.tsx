import React from 'react';
import VerticalBlueLine from './VerticalBlueLine';
import Link from 'next/link';

const MyLevelAndScore = () => {
  return (
    <main className="w-full h-full flex flex-col items-center bg-bgColor2 border-solid border-t border-pointColor1">
      <div className="mt-12 text-2xl font-semibold">
        전체 올라온 퀴즈 <span className="text-pointColor1">000</span>개 중{' '}
        <span className="text-pointColor1">000</span>개의 퀴즈를 풀었어요!
      </div>
      <div className="flex gap-7 mt-16">
        <div className="flex flex-col items-center w-32">
          <p>레벨</p>
          <p className="mt-5 text-4xl font-semibold text-pointColor1">999</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>퀴즈 점수</p>
          <p className="mt-5 text-4xl font-semibold text-pointColor1">999</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>타자연습 점수</p>
          <p className="mt-5 text-4xl font-semibold text-pointColor1">999</p>
        </div>
        <VerticalBlueLine />
        <div className="flex flex-col items-center w-32">
          <p>총 점수</p>
          <p className="mt-5 text-4xl font-semibold text-pointColor1">999</p>
        </div>
      </div>
      <div className="text-center mt-16 text-pointColor1 font-semibold underline underline-offset-4">
        <Link href="/">나의 활동 보러가기</Link>
      </div>
    </main>
  );
};

export default MyLevelAndScore;
