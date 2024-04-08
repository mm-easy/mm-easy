'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getQuiz } from '@/api/quizzes';
import { getQuestions } from '@/api/questions';
import { formatToLocaleDateTimeString } from '@/utils/date';
import { QuestionType, type GetQuiz, type Question } from '@/types/quizzes';
import { useState } from 'react';
import Options from './Options';
import { handleMaxLength } from '@/utils/handleMaxLength';

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
    queryKey: ['quizzes']
  });

  const {
    data: questionsData,
    isLoading: questionsIsLoading,
    isError: questionsIsError
  } = useQuery({
    queryFn: async () => {
      try {
        const data = await getQuestions(id);
        return data;
      } catch (error) {
        return error;
      }
    },
    queryKey: ['questions']
  });

  // console.log(quizData[0]);
  console.log(questionsData);

  if (quizIsLoading) return <div>퀴즈 로드 중..</div>;
  if (quizIsError) return <div>퀴즈 로드 에러..</div>;

  if (questionsIsLoading) return <div>퀴즈 로드 중..</div>;
  if (questionsIsError) return <div>퀴즈 로드 에러..</div>;

  const quizzes = quizData as GetQuiz[];
  const { title, level, info, thumbnail_img_url: url, creator_id, created_at } = quizzes[0];

  const questions = questionsData as Question[];

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
        <article className="bg-bgColor1 text-pointColor1 border-solid border-r-2 border-pointColor1">
          <section>
            <Image
              src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/quiz-thumbnails/${url}`}
              alt="샘플 이미지"
              width={144}
              height={144}
              className="w-full h-[144px] object-cover border-solid border-b-2 border-pointColor1"
            />
            <section className="p-4 flex flex-col gap-4 border-solid border-b-2 border-pointColor1">
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
        <article className="py-8 flex flex-col place-items-center gap-10">
          {questions.map((question) => {
            const { id, title, type, img_url } = question;
            return (
              <section key={id} className="w-[570px] flex flex-col place-items-center gap-4">
                <h3 className="self-start text-lg">{`${questions.indexOf(question) + 1}. ${title}`}</h3>
                <Image
                  src={`https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/question-imgs/${img_url}`}
                  alt="문제 이미지"
                  width={570}
                  height={200}
                  className="h-[200px] object-cover rounded-md"
                />
                {type === QuestionType.objective ? (
                  <Options id={id} />
                ) : (
                  <div className="w-full relative">
                    <input
                      type="text"
                      className="w-full pl-4 py-[9px] border-solid border border-pointColor1 rounded-md"
                      onChange={(e) => handleMaxLength(e, 25)}
                    />
                    <p className="absolute top-0 right-2 pt-3 pr-1 text-sm">0/25</p>
                  </div>
                )}
              </section>
            );
          })}
          <button className="w-[570px] pl-4 py-[9px] bg-pointColor1 text-white font-bold tracking-wider rounded-md">
            제출하기
          </button>
        </article>
      </main>
    </>
  );
};

export default QuizTryPage;
