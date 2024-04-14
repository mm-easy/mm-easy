import { getRecentQuizzes } from '@/api/quizzes';
import { useQuery } from '@tanstack/react-query';
import QuestionEx from './QuestionEx';
import Image from 'next/image';
import Link from 'next/link';

import type { Quiz } from '@/types/quizzes';
import { storageUrl } from '@/utils/supabase/storage';

const QuizSection = () => {
  const { data: quiz, isLoading } = useQuery<Quiz[]>({
    queryKey: ['recentQuiz'],
    queryFn: getRecentQuizzes,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <>
      <div className="p-4 text-lg text-pointColor1 bg-bgColor1 font-bold border-b-2 border-solid border-pointColor1">
        <div className="flex items-center justify-center">
          <p className="w-5/6 ml-10">최근 올라온 퀴즈</p>
          <Link href={`/quiz-list`} className="mr-10 font-semibold text-lg text-pointColor1">
            더보기
          </Link>
        </div>
      </div>
      <section className="flex flex-col justify-center items-center">
        <div className="w-5/6 grid grid-cols-4 gap-5 p-4">
          {quiz?.map((quiz) => (
            <div
              key={quiz.id}
              className="flex flex-col border my-5 border-solid border-gray-200 rounded-t-3xl rounded-b-md p-4"
            >
              <p className="font-bold text-lg mt-4 mb-3 truncate">{quiz.title}</p>
              <div className="flex flex-col gap-3">
                <Image
                  src={`${storageUrl}/quiz-thumbnails/${quiz.thumbnail_img_url}`}
                  alt="퀴즈 썸네일"
                  width={250}
                  height={250}
                  quality={100}
                  className="w-full h-[250px] object-cover border-solid border border-pointColor1 rounded-md"
                />
                <QuestionEx id={quiz.id} />
                <Link href={`/quiz/${quiz.id}`}>
                  <div className="text-white bg-pointColor1 rounded-md p-2 text-center">퀴즈 풀기</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default QuizSection;
