'use client';

import Image from 'next/image';
import QuizList from './QuizList';
import Level1 from '@/assets/level1.png';
import Level2 from '@/assets/level2.png';
import Level3 from '@/assets/level3.png';
import { BlueButton } from '@/components/common/FormButtons';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getQuizzes } from '@/api/quizzes';

import type { Quiz } from '@/types/quizzes';
import { useState } from 'react';

const SelectQuizLevel = () => {
  const [quizLevelSelected, setQuizLevelSelected] = useState<Quiz[]>([]);
  const router = useRouter();

  /** 퀴즈 만들기 버튼 클릭 시 */
  const handleMakeQuizBtn = () => {
    router.push('/quiz-form');
  };

  /** quizzes 테이블에서 리스트 가져오기 */
  const { data, isLoading, isError } = useQuery<Quiz[]>({
    queryFn: async () => {
      try {
        const data = await getQuizzes();
        setQuizLevelSelected(data);
        return data;
      } catch (error) {
        return [];
      }
    },
    queryKey: ['quizzes'],
    refetchOnWindowFocus: false
  });

  if (isLoading) return <div>데이터 로드 중...</div>;
  if (isError) return <div>데이터 로드 실패</div>;
  if (!data) return;

  /** 클릭하여 퀴즈 레벨 필터링 */
  const handleSelectLevel = (level: number) => {
    const filteredQuizzes = data.filter((item) => item.level === level);
    setQuizLevelSelected(filteredQuizzes);
  };

  return (
    <>
      <main className="w-full bg-pointColor1 border-b-2 border-pointColor1 flex flex-col justify-center items-center">
        <div className="mt-5 mr-1/4 absolute top-20 left-3/4">
          <BlueButton text="퀴즈 만들기" onClick={handleMakeQuizBtn} width="w-36" />
        </div>
        <div className="flex items-end overflow-hidden">
          <Image
            src={Level1}
            alt="초급"
            width={350}
            height={240}
            className="object-none transform translate-y-[50%] hover:translate-y-[10%] transition-transform duration-500 ease-in-out"
            onClick={() => handleSelectLevel(1)}
          />
          <Image
            src={Level2}
            alt="중급"
            width={350}
            height={240}
            className="object-none transform translate-y-[30%] hover:translate-y-[10%] transition-transform duration-500 ease-in-out"
            onClick={() => handleSelectLevel(2)}
          />
          <Image
            src={Level3}
            alt="고급"
            width={350}
            height={240}
            className="object-none transform translate-y-[60%] hover:translate-y-[10%] transition-transform duration-500 ease-in-out"
            onClick={() => handleSelectLevel(3)}
          />
        </div>
      </main>
      <QuizList quizLevelSelected={quizLevelSelected} />
    </>
  );
};

export default SelectQuizLevel;
