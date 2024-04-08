'use client';

import Image from 'next/image';

import { Quiz } from '@/types/quizzes';
import Link from 'next/link';

const QuizList = ({ quizLevelSelected }: { quizLevelSelected: Quiz[] }) => {
  return (
    <main className="p-5 flex flex-col gap-4 items-center">
      {quizLevelSelected.length === 0 && <div className="p-36">해당 난이도에 아직 등록된 퀴즈가 없습니다.</div>}
      <div className="w-7/12 grid grid-cols-4 mt-5 place-items-center grid-flow-col">
        {quizLevelSelected.map((item) => (
          <Link key={item.id} href={`/quiz/${item.id}`}>
            <div className="flex flex-col gap-3 mb-8">
              <div className="border-solid border border-pointColor1 rounded-md overflow-hidden w-[250px] h-[250px]">
                <Image
                  src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/quiz-thumbnails/${item.thumbnail_img_url}`}
                  alt="퀴즈 썸네일"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-lg">{item.title}</p>
                <p>{item.info}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default QuizList;
