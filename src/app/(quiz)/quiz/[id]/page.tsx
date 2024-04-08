'use client';

import { getQuestions } from '@/api/questions';
import { getQuiz } from '@/api/quizzes';
import { GetQuiz } from '@/types/quizzes';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const QuizTryPage = () => {
  const { id } = useParams();

  const {
    data: quizData,
    isLoading: quizIsLoading,
    isError: quizIsError
  } = useQuery({
    queryFn: async () => {
      try {
        const data = await getQuiz(id);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['quiz']
  });
  const {
    data: questionData,
    isLoading: questionIsLoading,
    isError: questionIsError
  } = useQuery({
    queryFn: async () => {
      try {
        const data = await getQuestions(id);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['question']
  });

  // console.log(quizData[0]);
  console.log(questionData);

  if (quizIsLoading) return <div>퀴즈 로드 중..</div>;
  const quiz = quizData as GetQuiz[];

  const { title, level, info, thumbnail_img_url: url, creator_id, created_at } = quiz[0];

  return (
    <>
      <header className="h-[8vh] flex leading-[7.5vh] border-solid border-b-2 border-pointColor1">
        <h2 className="w-[10%] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
          퀴즈 풀기
        </h2>
        <h2 className="w-[8%] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
          난이도
        </h2>
        <h3 className="w-[8%] text-center border-solid border-r-2 border-pointColor1">
          {level === 1 ? '순한맛' : level === 2 ? '중간맛' : '매운맛'}
        </h3>
        <h2 className="w-[8%] text-center font-bold text-pointColor1 bg-bgColor1 border-solid border-r-2 border-pointColor1">
          제목
        </h2>
        <h3 className="pl-[2%]">{title}</h3>
      </header>
      <main className="grid grid-cols-[10%_90%]">
        <article className="h-[76vh] bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
          <section>
            <Image
              src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/quiz-thumbnails/${url}`}
              alt="샘플 이미지"
              width={144}
              height={144}
              className="w-full h-[144px] object-cover"
            />
            <section className="p-4 flex flex-col gap-3 border-solid border-y-2 border-pointColor1">
              <div>
                <h4>작성자</h4>
                <p>{creator_id}</p>
              </div>
              <div>
                <h4>등록일</h4>
                <p>{formatToLocaleDateTimeString(created_at)}</p>
              </div>
            </section>
          </section>
          <p className="p-4">{info}</p>
        </article>
        <article className=""></article>
      </main>
    </>
  );
};

export default QuizTryPage;
